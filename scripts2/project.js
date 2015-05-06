
var runstant = runstant || {};

;(function() {

    var Project = function() {
        this.init();
    };

    var wrapTag = function(text, tag) {
        return '<' + tag + '>' + text + '</' + tag + '>';
    };


    var script2tag = function(path) {
        return '<${script} src="${path}"></${script}>'
            .replace(/\$\{script\}/g, "script")
            .replace(/\$\{path\}/, path)
            ;
    };

    Project.prototype = {
        data: null,
        cache: null,

        init: function() {
            this.load();
        },

        load: function() {
            var data = null;

            if (location.hash) {
                var hash = location.hash.substr(1);
                data = util.hash2json(hash);
            }
            else {
                data = constant.TEMPLATE_DATA;
            }

            // 後方互換
            if (data.setting.detail && !data.setting.description) {
                data.setting.description = data.setting.detail;
            }

            this.data = data;

            // キャッシュしておく
            this.cache = JSON.stringify(this.data);
            // タイトル更新
            document.title = this.getTitle() + " | runstant";
        },

        save: function() {
        	var dataString = JSON.stringify(this.data);

        	if (this.cache !== dataString) {
        		this.cache = dataString;

        		var hash = util.json2hash(this.data);
        		history.pushState(null, 'runstant', '#' + hash);

				// タイトル更新
				document.title = this.getTitle() + " | runstant";
        	}
        },

        getTitle: function() {
            return this.data.setting.title;
        },
        setTitle: function(v) {
            this.data.setting.title = v;
        },

        getDescription: function() {
            return this.data.setting.description;
        },
        setDescription: function(v) {
            this.data.setting.description = v;
        },

        getCode: function(lang) {
            return this.data.code[lang];
        },

        toCode: function(debug) {
			var data = this.data;
			var setting = data.setting;
			var code = data.code;

        	var htmlCode = code.html.value;
            if (runstant.compiler[code.html.type]) {
                htmlCode = runstant.compiler[code.html.type].func(htmlCode);
            }
        	var cssCode = code.style.value;
            if (runstant.compiler[code.style.type]) {
                cssCode = runstant.compiler[code.style.type].func(cssCode);
            }
        	var jsCode = code.script.value;
            if (runstant.compiler[code.script.type]) {
                jsCode = runstant.compiler[code.script.type].func(jsCode);
            }

			var finalCode = htmlCode
		    	.replace("${title}", setting.title)
		    	.replace("${description}", setting.description)
		    	.replace("${style}", cssCode)
		    	.replace("${script}", jsCode)
		    	;

            if (debug === true) {
                var debugCode = '(' + util.ConsoleExtention.toString() + ')()';
                finalCode = wrapTag(debugCode, 'script') + finalCode;
            }

		    return finalCode;
        },
    };


    runstant.Project = Project;


    runstant.compiler = {
        // html
        'jade': {
            func: util.jade2html,
        },
        'markdown': {
            func: util.markdown2html,
        },
        // style
        'stylus': {
            func: util.stylus2css,
        },
        'less': {
            func: util.less2css,
        },
        'sass': {
            func: util.sass2css,
        },
        // script
        'coffee': {
            func: util.coffee2js,
        },
        'ecmascript6': {
            func: util.es62js,
            prefix: script2tag("http://cdn.rawgit.com/google/traceur-compiler/519f5663415cb825ead961177c4165d52721c33f/bin/traceur-runtime.js"),
        },
        'typescript': {
            func: util.typescript2js,
        },
    };

})();





















