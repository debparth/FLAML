"""Require: pip install flaml[test,ray]
"""
from flaml.searcher.blendsearch import BlendSearch
import time
import os
from sklearn.model_selection import train_test_split
import sklearn.metrics
import sklearn.datasets
import xgboost as xgb
import logging

try:
    from ray.tune.integration.xgboost import TuneReportCheckpointCallback
except ImportError:
    print("skip test_xgboost because ray tune cannot be imported.")

logger = logging.getLogger(__name__)
os.makedirs("logs", exist_ok=True)
logger.addHandler(logging.FileHandler("logs/tune.log"))
logger.setLevel(logging.INFO)


def test_nested_run():
    from flaml import AutoML, tune

    data, labels = sklearn.datasets.load_breast_cancer(return_X_y=True)
    train_x, val_x, y_train, y_val = train_test_split(data, labels, test_size=0.25)
    space_pca = {
        "n_components": tune.uniform(0.5, 0.99),
    }

    def pca_flaml(config):
        n_components = config["n_components"]
        from sklearn.decomposition import PCA

        pca = PCA(n_components)
        X_train = pca.fit_transform(train_x)
        X_val = pca.transform(val_x)
        automl = AutoML()
        automl.fit(X_train, y_train, X_val=X_val, y_val=y_val, time_budget=1)
        return {"loss": automl.best_loss}

    analysis = tune.run(
        pca_flaml,
        space_pca,
        metric="loss",
        mode="min",
        num_samples=5,
        local_dir="logs",
        log_file_name="logs/nested.log",
        verbose=3,
    )
    print(analysis.best_result)


def train_breast_cancer(config: dict):
    # This is a simple training function to be passed into Tune
    # Load dataset
    data, labels = sklearn.datasets.load_breast_cancer(return_X_y=True)
    # Split into train and test set
    train_x, test_x, train_y, test_y = train_test_split(data, labels, test_size=0.25)
    # Build input matrices for XGBoost
    train_set = xgb.DMatrix(train_x, label=train_y)
    test_set = xgb.DMatrix(test_x, label=test_y)
    # HyperOpt returns a tuple
    config = config.copy()
    config["eval_metric"] = ["logloss", "error"]
    config["objective"] = "binary:logistic"
    # Train the classifier, using the Tune callback
    xgb.train(
        config,
        train_set,
        evals=[(test_set, "eval")],
        verbose_eval=False,
        callbacks=[TuneReportCheckpointCallback(filename="model.xgb")],
    )


def _test_xgboost(method="BlendSearch"):
    try:
        import ray
    except ImportError:
        return
    if method == "BlendSearch":
        from flaml import tune
    else:
        from ray import tune
    search_space = {
        "max_depth": tune.randint(1, 9)
        if method in ["BlendSearch", "BOHB", "Optuna"]
        else tune.randint(1, 9),
        "min_child_weight": tune.choice([1, 2, 3]),
        "subsample": tune.uniform(0.5, 1.0),
        "eta": tune.loguniform(1e-4, 1e-1),
    }
    max_iter = 10
    for num_samples in [128]:
        time_budget_s = 60
        for n_cpu in [2]:
            start_time = time.time()
            # ray.init(address='auto')
            if method == "BlendSearch":
                analysis = tune.run(
                    train_breast_cancer,
                    config=search_space,
                    low_cost_partial_config={
                        "max_depth": 1,
                    },
                    cat_hp_cost={
                        "min_child_weight": [6, 3, 2],
                    },
                    metric="eval-logloss",
                    mode="min",
                    max_resource=max_iter,
                    min_resource=1,
                    scheduler="asha",
                    # You can add "gpu": 0.1 to allocate GPUs
                    resources_per_trial={"cpu": 1},
                    local_dir="logs/",
                    num_samples=num_samples * n_cpu,
                    time_budget_s=time_budget_s,
                    use_ray=True,
                )
            else:
                if "ASHA" == method:
                    algo = None
                elif "BOHB" == method:
                    from ray.tune.schedulers import HyperBandForBOHB
                    from ray.tune.suggest.bohb import TuneBOHB

                    algo = TuneBOHB(max_concurrent=n_cpu)
                    scheduler = HyperBandForBOHB(max_t=max_iter)
                elif "Optuna" == method:
                    from ray.tune.suggest.optuna import OptunaSearch

                    algo = OptunaSearch()
                elif "CFO" == method:
                    from flaml import CFO

                    algo = CFO(
                        low_cost_partial_config={
                            "max_depth": 1,
                        },
                        cat_hp_cost={
                            "min_child_weight": [6, 3, 2],
                        },
                    )
                elif "CFOCat" == method:
                    from flaml.searcher.cfo_cat import CFOCat

                    algo = CFOCat(
                        low_cost_partial_config={
                            "max_depth": 1,
                        },
                        cat_hp_cost={
                            "min_child_weight": [6, 3, 2],
                        },
                    )
                elif "Dragonfly" == method:
                    from ray.tune.suggest.dragonfly import DragonflySearch

                    algo = DragonflySearch()
                elif "SkOpt" == method:
                    from ray.tune.suggest.skopt import SkOptSearch

                    algo = SkOptSearch()
                elif "Nevergrad" == method:
                    from ray.tune.suggest.nevergrad import NevergradSearch
                    import nevergrad as ng

                    algo = NevergradSearch(optimizer=ng.optimizers.OnePlusOne)
                elif "ZOOpt" == method:
                    from ray.tune.suggest.zoopt import ZOOptSearch

                    algo = ZOOptSearch(budget=num_samples * n_cpu)
                elif "Ax" == method:
                    from ray.tune.suggest.ax import AxSearch

                    algo = AxSearch()
                elif "HyperOpt" == method:
                    from ray.tune.suggest.hyperopt import HyperOptSearch

                    algo = HyperOptSearch()
                    scheduler = None
                if method != "BOHB":
                    from ray.tune.schedulers import ASHAScheduler

                    scheduler = ASHAScheduler(max_t=max_iter, grace_period=1)
                analysis = tune.run(
                    train_breast_cancer,
                    metric="eval-logloss",
                    mode="min",
                    # You can add "gpu": 0.1 to allocate GPUs
                    resources_per_trial={"cpu": 1},
                    config=search_space,
                    local_dir="logs/",
                    num_samples=num_samples * n_cpu,
                    time_budget_s=time_budget_s,
                    scheduler=scheduler,
                    search_alg=algo,
                )
            # # Load the best model checkpoint
            # import os
            # best_bst = xgb.Booster()
            # best_bst.load_model(os.path.join(analysis.best_checkpoint,
            #  "model.xgb"))
            best_trial = analysis.get_best_trial("eval-logloss", "min", "all")
            accuracy = 1.0 - best_trial.metric_analysis["eval-error"]["min"]
            logloss = best_trial.metric_analysis["eval-logloss"]["min"]
            logger.info(f"method={method}")
            logger.info(f"n_samples={num_samples*n_cpu}")
            logger.info(f"time={time.time()-start_time}")
            logger.info(f"Best model eval loss: {logloss:.4f}")
            logger.info(f"Best model total accuracy: {accuracy:.4f}")
            logger.info(f"Best model parameters: {best_trial.config}")


def test_nested_space():
    from flaml import tune, CFO

    search_space = {
        # test nested search space
        "cost_related": {
            "a": tune.randint(1, 9),
        },
        "b": tune.uniform(0.5, 1.0),
    }

    def simple_func(config):
        obj = (config["cost_related"]["a"] - 4) ** 2 + (
            config["b"] - config["cost_related"]["a"]
        ) ** 2
        tune.report(obj=obj)
        tune.report(obj=obj, ab=config["cost_related"]["a"] * config["b"])

    analysis = tune.run(
        simple_func,
        search_alg=CFO(
            space=search_space,
            metric="obj",
            mode="min",
            low_cost_partial_config={"cost_related": {"a": 1}},
            points_to_evaluate=[
                {"b": 0.99, "cost_related": {"a": 3}},
                {"b": 0.99, "cost_related": {"a": 2}},
                {"cost_related": {"a": 8}},
            ],
            metric_constraints=[("ab", "<=", 4)],
        ),
        local_dir="logs/",
        num_samples=-1,
        time_budget_s=1,
    )

    best_trial = analysis.get_best_trial()
    logger.info(f"CFO best config: {best_trial.config}")
    logger.info(f"CFO best result: {best_trial.last_result}")

    bs = BlendSearch(
        experimental=True,
        space=search_space,
        metric="obj",
        mode="min",
        low_cost_partial_config={"cost_related": {"a": 1}},
        points_to_evaluate=[
            {"b": 0.99, "cost_related": {"a": 3}},
            {"b": 0.99, "cost_related": {"a": 2}},
            {"cost_related": {"a": 8}},
        ],
        metric_constraints=[("ab", "<=", 4)],
    )
    analysis = tune.run(
        simple_func,
        search_alg=bs,
        local_dir="logs/",
        num_samples=-1,
        time_budget_s=1,
    )
    print(bs.results)
    best_trial = analysis.get_best_trial()
    logger.info(f"BlendSearch exp best config: {best_trial.config}")
    logger.info(f"BlendSearch exp best result: {best_trial.last_result}")

    points_to_evaluate = [
        {"b": 0.99, "cost_related": {"a": 3}},
        {"b": 0.99, "cost_related": {"a": 2}},
        {"cost_related": {"a": 8}},
    ]
    analysis = tune.run(
        simple_func,
        config=search_space,
        low_cost_partial_config={"cost_related": {"a": 1}},
        points_to_evaluate=points_to_evaluate,
        evaluated_rewards=[
            (config["cost_related"]["a"] - 4) ** 2
            + (config["b"] - config["cost_related"]["a"]) ** 2
            for config in points_to_evaluate[:-1]
        ],
        metric="obj",
        mode="min",
        metric_constraints=[("ab", "<=", 4)],
        local_dir="logs/",
        num_samples=-1,
        time_budget_s=1,
    )

    best_trial = analysis.get_best_trial()
    logger.info(f"BlendSearch best config: {best_trial.config}")
    logger.info(f"BlendSearch best result: {best_trial.last_result}")


def test_run_training_function_return_value():
    from flaml import tune

    # Test dict return value
    def evaluate_config_dict(config):
        metric = (round(config["x"]) - 85000) ** 2 - config["x"] / config["y"]
        return {"metric": metric}

    tune.run(
        evaluate_config_dict,
        config={
            "x": tune.qloguniform(lower=1, upper=100000, q=1),
            "y": tune.qrandint(lower=2, upper=100000, q=2),
        },
        metric="metric",
        mode="max",
        num_samples=100,
    )

    # Test scalar return value
    def evaluate_config_scalar(config):
        metric = (round(config["x"]) - 85000) ** 2 - config["x"] / config["y"]
        return metric

    tune.run(
        evaluate_config_scalar,
        config={
            "x": tune.qloguniform(lower=1, upper=100000, q=1),
            "y": tune.qlograndint(lower=2, upper=100000, q=2),
        },
        num_samples=100,
        mode="max",
    )

    # Test empty return value
    def evaluate_config_empty(config):
        return {}

    tune.run(
        evaluate_config_empty,
        config={
            "x": tune.qloguniform(lower=1, upper=100000, q=1),
            "y": tune.qlograndint(lower=2, upper=100000, q=2),
        },
        num_samples=10,
        mode="max",
    )


def test_xgboost_bs():
    _test_xgboost()


def _test_xgboost_cfo():
    _test_xgboost("CFO")


def test_xgboost_cfocat():
    _test_xgboost("CFOCat")


def _test_xgboost_dragonfly():
    _test_xgboost("Dragonfly")


def _test_xgboost_skopt():
    _test_xgboost("SkOpt")


def _test_xgboost_nevergrad():
    _test_xgboost("Nevergrad")


def _test_xgboost_zoopt():
    _test_xgboost("ZOOpt")


def _test_xgboost_ax():
    _test_xgboost("Ax")


def __test_xgboost_hyperopt():
    _test_xgboost("HyperOpt")


def _test_xgboost_optuna():
    _test_xgboost("Optuna")


def _test_xgboost_asha():
    _test_xgboost("ASHA")


def _test_xgboost_bohb():
    _test_xgboost("BOHB")


if __name__ == "__main__":
    test_xgboost_bs()
