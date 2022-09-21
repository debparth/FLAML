"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2314],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),h=r,d=m["".concat(o,".").concat(h)]||m[h]||u[h]||i;return n?a.createElement(d,s(s({ref:t},c),{},{components:n})):a.createElement(d,s({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var p=2;p<i;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6235:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>o});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_label:"suggestion",title:"searcher.suggestion"},s=void 0,l={unversionedId:"reference/searcher/suggestion",id:"reference/searcher/suggestion",isDocsHomePage:!1,title:"searcher.suggestion",description:"Searcher Objects",source:"@site/docs/reference/searcher/suggestion.md",sourceDirName:"reference/searcher",slug:"/reference/searcher/suggestion",permalink:"/FLAML/docs/reference/searcher/suggestion",editUrl:"https://github.com/microsoft/FLAML/edit/main/website/docs/reference/searcher/suggestion.md",tags:[],version:"current",frontMatter:{sidebar_label:"suggestion",title:"searcher.suggestion"},sidebar:"referenceSideBar",previous:{title:"search_thread",permalink:"/FLAML/docs/reference/searcher/search_thread"},next:{title:"variant_generator",permalink:"/FLAML/docs/reference/searcher/variant_generator"}},o=[{value:"Searcher Objects",id:"searcher-objects",children:[{value:"set_search_properties",id:"set_search_properties",children:[],level:4},{value:"on_trial_result",id:"on_trial_result",children:[],level:4},{value:"metric",id:"metric",children:[],level:4},{value:"mode",id:"mode",children:[],level:4}],level:2},{value:"ConcurrencyLimiter Objects",id:"concurrencylimiter-objects",children:[{value:"validate_warmstart",id:"validate_warmstart",children:[],level:4}],level:2},{value:"OptunaSearch Objects",id:"optunasearch-objects",children:[],level:2}],p={toc:o};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"searcher-objects"},"Searcher Objects"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"class Searcher()\n")),(0,r.kt)("p",null,"Abstract class for wrapping suggesting algorithms.\nCustom algorithms can extend this class easily by overriding the\n",(0,r.kt)("inlineCode",{parentName:"p"},"suggest")," method provide generated parameters for the trials.\nAny subclass that implements ",(0,r.kt)("inlineCode",{parentName:"p"},"__init__")," must also call the\nconstructor of this class: ",(0,r.kt)("inlineCode",{parentName:"p"},"super(Subclass, self).__init__(...)"),".\nTo track suggestions and their corresponding evaluations, the method\n",(0,r.kt)("inlineCode",{parentName:"p"},"suggest")," will be passed a trial_id, which will be used in\nsubsequent notifications.\nNot all implementations support multi objectives."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Arguments"),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"metric")," ",(0,r.kt)("em",{parentName:"li"},"str or list")," - The training result objective value attribute. If\nlist then list of training result objective value attributes"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"mode")," ",(0,r.kt)("em",{parentName:"li"},"str or list")," - If string One of {min, max}. If list then\nlist of max and min, determines whether objective is minimizing\nor maximizing the metric attribute. Must match type of metric.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'class ExampleSearch(Searcher):\n    def __init__(self, metric="mean_loss", mode="min", **kwargs):\n        super(ExampleSearch, self).__init__(\n            metric=metric, mode=mode, **kwargs)\n        self.optimizer = Optimizer()\n        self.configurations = {}\n    def suggest(self, trial_id):\n        configuration = self.optimizer.query()\n        self.configurations[trial_id] = configuration\n    def on_trial_complete(self, trial_id, result, **kwargs):\n        configuration = self.configurations[trial_id]\n        if result and self.metric in result:\n            self.optimizer.update(configuration, result[self.metric])\ntune.run(trainable_function, search_alg=ExampleSearch())\n')),(0,r.kt)("h4",{id:"set_search_properties"},"set","_","search","_","properties"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"def set_search_properties(metric: Optional[str], mode: Optional[str], config: Dict) -> bool\n")),(0,r.kt)("p",null,"Pass search properties to searcher.\nThis method acts as an alternative to instantiating search algorithms\nwith their own specific search spaces. Instead they can accept a\nTune config through this method. A searcher should return ",(0,r.kt)("inlineCode",{parentName:"p"},"True"),"\nif setting the config was successful, or ",(0,r.kt)("inlineCode",{parentName:"p"},"False")," if it was\nunsuccessful, e.g. when the search space has already been set."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Arguments"),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"metric")," ",(0,r.kt)("em",{parentName:"li"},"str")," - Metric to optimize"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"mode")," ",(0,r.kt)("em",{parentName:"li"},"str")," - One of ",'["min", "max"]',". Direction to optimize."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"config")," ",(0,r.kt)("em",{parentName:"li"},"dict")," - Tune config dict.")),(0,r.kt)("h4",{id:"on_trial_result"},"on","_","trial","_","result"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"def on_trial_result(trial_id: str, result: Dict)\n")),(0,r.kt)("p",null,"Optional notification for result during training.\nNote that by default, the result dict may include NaNs or\nmay not include the optimization metric. It is up to the\nsubclass implementation to preprocess the result to\navoid breaking the optimization process."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Arguments"),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"trial_id")," ",(0,r.kt)("em",{parentName:"li"},"str")," - A unique string ID for the trial."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"result")," ",(0,r.kt)("em",{parentName:"li"},"dict")," - Dictionary of metrics for current training progress.\nNote that the result dict may include NaNs or\nmay not include the optimization metric. It is up to the\nsubclass implementation to preprocess the result to\navoid breaking the optimization process.")),(0,r.kt)("h4",{id:"metric"},"metric"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"@property\ndef metric() -> str\n")),(0,r.kt)("p",null,"The training result objective value attribute."),(0,r.kt)("h4",{id:"mode"},"mode"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"@property\ndef mode() -> str\n")),(0,r.kt)("p",null,"Specifies if minimizing or maximizing the metric."),(0,r.kt)("h2",{id:"concurrencylimiter-objects"},"ConcurrencyLimiter Objects"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"class ConcurrencyLimiter(Searcher)\n")),(0,r.kt)("p",null,"A wrapper algorithm for limiting the number of concurrent trials."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Arguments"),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"searcher")," ",(0,r.kt)("em",{parentName:"li"},"Searcher")," - Searcher object that the\nConcurrencyLimiter will manage."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"max_concurrent")," ",(0,r.kt)("em",{parentName:"li"},"int")," - Maximum concurrent samples from the underlying\nsearcher."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"batch")," ",(0,r.kt)("em",{parentName:"li"},"bool")," - Whether to wait for all concurrent samples\nto finish before updating the underlying searcher.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'from ray.tune.suggest import ConcurrencyLimiter  # ray version < 2\nsearch_alg = HyperOptSearch(metric="accuracy")\nsearch_alg = ConcurrencyLimiter(search_alg, max_concurrent=2)\ntune.run(trainable, search_alg=search_alg)\n')),(0,r.kt)("h4",{id:"validate_warmstart"},"validate","_","warmstart"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"def validate_warmstart(parameter_names: List[str], points_to_evaluate: List[Union[List, Dict]], evaluated_rewards: List, validate_point_name_lengths: bool = True)\n")),(0,r.kt)("p",null,"Generic validation of a Searcher's warm start functionality.\nRaises exceptions in case of type and length mismatches between\nparameters.\nIf ",(0,r.kt)("inlineCode",{parentName:"p"},"validate_point_name_lengths")," is False, the equality of lengths\nbetween ",(0,r.kt)("inlineCode",{parentName:"p"},"points_to_evaluate")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"parameter_names")," will not be\nvalidated."),(0,r.kt)("h2",{id:"optunasearch-objects"},"OptunaSearch Objects"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"class OptunaSearch(Searcher)\n")),(0,r.kt)("p",null,"A wrapper around Optuna to provide trial suggestions.\n",(0,r.kt)("a",{parentName:"p",href:"https://optuna.org/"},"Optuna"),"\nis a hyperparameter optimization library.\nIn contrast to other libraries, it employs define-by-run style\nhyperparameter definitions.\nThis Searcher is a thin wrapper around Optuna's search algorithms.\nYou can pass any Optuna sampler, which will be used to generate\nhyperparameter suggestions."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Arguments"),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"space")," ",(0,r.kt)("em",{parentName:"p"},"dict|Callable")," - Hyperparameter search space definition for\nOptuna's sampler. This can be either a class ",(0,r.kt)("inlineCode",{parentName:"p"},"dict")," with\nparameter names as keys and ",(0,r.kt)("inlineCode",{parentName:"p"},"optuna.distributions")," as values,\nor a Callable - in which case, it should be a define-by-run\nfunction using ",(0,r.kt)("inlineCode",{parentName:"p"},"optuna.trial")," to obtain the hyperparameter\nvalues. The function should return either a class ",(0,r.kt)("inlineCode",{parentName:"p"},"dict")," of\nconstant values with names as keys, or None.\nFor more information, see\n",(0,r.kt)("a",{parentName:"p",href:"https://optuna.readthedocs.io/en/stable/tutorial/10_key_features/002_configurations.html"},"tutorial"),".\nWarning - No actual computation should take place in the define-by-run\nfunction. Instead, put the training logic inside the function\nor class trainable passed to tune.run.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"metric")," ",(0,r.kt)("em",{parentName:"p"},"str")," - The training result objective value attribute. If None\nbut a mode was passed, the anonymous metric ",(0,r.kt)("inlineCode",{parentName:"p"},"_metric")," will be used\nper default.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"mode")," ",(0,r.kt)("em",{parentName:"p"},"str")," - One of {min, max}. Determines whether objective is\nminimizing or maximizing the metric attribute.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"points_to_evaluate")," ",(0,r.kt)("em",{parentName:"p"},"list")," - Initial parameter suggestions to be run\nfirst. This is for when you already have some good parameters\nyou want to run first to help the algorithm make better suggestions\nfor future parameters. Needs to be a list of dicts containing the\nconfigurations.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"sampler")," ",(0,r.kt)("em",{parentName:"p"},"optuna.samplers.BaseSampler")," - Optuna sampler used to\ndraw hyperparameter configurations. Defaults to ",(0,r.kt)("inlineCode",{parentName:"p"},"TPESampler"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"seed")," ",(0,r.kt)("em",{parentName:"p"},"int")," - Seed to initialize sampler with. This parameter is only\nused when ",(0,r.kt)("inlineCode",{parentName:"p"},"sampler=None"),". In all other cases, the sampler\nyou pass should be initialized with the seed already.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"evaluated_rewards")," ",(0,r.kt)("em",{parentName:"p"},"list")," - If you have previously evaluated the\nparameters passed in as points_to_evaluate you can avoid\nre-running those trials by passing in the reward attributes\nas a list so the optimiser can be told the results without\nneeding to re-compute the trial. Must be the same length as\npoints_to_evaluate."),(0,r.kt)("p",{parentName:"li"},"Tune automatically converts search spaces to Optuna's format:"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'from ray.tune.suggest.optuna import OptunaSearch  # ray version < 2\nconfig = { "a": tune.uniform(6, 8),\n           "b": tune.loguniform(1e-4, 1e-2)}\noptuna_search = OptunaSearch(metric="loss", mode="min")\ntune.run(trainable, config=config, search_alg=optuna_search)\n')),(0,r.kt)("p",null,"  If you would like to pass the search space manually, the code would\nlook like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'from ray.tune.suggest.optuna import OptunaSearch  # ray version < 2\nimport optuna\nconfig = { "a": optuna.distributions.UniformDistribution(6, 8),\n           "b": optuna.distributions.LogUniformDistribution(1e-4, 1e-2)}\noptuna_search = OptunaSearch(space,metric="loss",mode="min")\ntune.run(trainable, search_alg=optuna_search)\n# Equivalent Optuna define-by-run function approach:\ndef define_search_space(trial: optuna.Trial):\n    trial.suggest_float("a", 6, 8)\n    trial.suggest_float("b", 1e-4, 1e-2, log=True)\n    # training logic goes into trainable, this is just\n    # for search space definition\noptuna_search = OptunaSearch(\n    define_search_space,\n    metric="loss",\n    mode="min")\ntune.run(trainable, search_alg=optuna_search)\n.. versionadded:: 0.8.8\n')))}c.isMDXComponent=!0}}]);