/*
 *
 */

var rs = {
	data: null,
	editor: null,
	preview: null,
};


var LANG_SCRIPT_MAP = {
	'coffee': "http://cdnjs.cloudflare.com/ajax/libs/coffee-script/1.7.1/coffee-script.min.js",
	'ecmascript6': "http://cdn.rawgit.com/phi-jp/runstant/625e2c2e06bb409e92d05b1bc4e64584a9d1e434/plugins/traceur-compiler/traceur.js",
	'typescript': "http://rawgit.com/niutech/typescript-compile/gh-pages/js/typescript.min.js",

	'stylus': "http://cdnjs.cloudflare.com/ajax/libs/stylus/0.32.1/stylus.js",
	'less': "http://cdnjs.cloudflare.com/ajax/libs/less.js/1.7.3/less.min.js",
	'sass': "http://cdnjs.cloudflare.com/ajax/libs/sass.js/0.4.0/sass.min.js",

	'jade': "http://cdnjs.cloudflare.com/ajax/libs/jade/1.3.1/jade.min.js",
	'markdown': "http://cdnjs.cloudflare.com/ajax/libs/markdown.js/0.5.0/markdown.min.js",
};

;(function() {

	// htmlmin 対応
	var sandScriptTag = function(path) {
		return '<${script} src="${path}"></${script}>'
			.replace(/\$\{script\}/g, "script")
			.replace(/\$\{path\}/, path)
			;
	};

	rs.Data = function(param) {
		this.init(param);
	};

	rs.Data.prototype = {
		init: function(param) {
			this.cache = null;
			this.load();
		},

		save: function() {
			// object -> string -> encode uri -> btoa -> zip
			// ↓こっちにする
			// object -> json stringify -> zip -> encode uri
			var d = this.data;
			d = JSON.stringify(d);

			if (this.cache != d) {
				this.cache = d;

				d = zip(d);
				d = encodeURI(d);

				// location.hash = encodeURI(d);
				history.pushState(null, 'runstant', '#' + d);
			}

			// タイトル更新
			document.title = this.getTitle() + " | runstant";


			var value = this.getCurrentValue();
	        var firstLine = value.split('\n')[0];

	        var templateMap = [
	        	{
	        		name: 'tmlib',
	        		regexp: /tmlib/,
	        		message: 'Let\'s tmlib programming!',
	        		url: 'http://goo.gl/B2JcWF',
	        	},
	        	{
	        		name: 'stg',
	        		regexp: /stg/,
	        		message: 'シューティングゲームプログラミングを始めますか？',
	        		url: 'http://goo.gl/EHtBuv',
	        	},
	        	{
	        		name: 'es6',
	        		regexp: /es6/,
	        		message: 'Let\'s es6 programming!',
	        		url: "http://goo.gl/thJLBw",
	        	}
	        ];

	        templateMap.forEach(function(data) {
	        	if (data.regexp.test(firstLine)) {
	        		if (confirm(data.message)) {
	        			window.location.href = data.url;
	        		}
	        	}
	        });
		},

		load: function() {
			var data = null;
			// decode uri -> unzip -> json parse -> object
		    if (location.hash) {
		    	var hash = location.hash.substr(1);
		    	data = _decode(hash);
		    }
		    else {
		    	data = {
		    		version: '0.0.1',
	    			current: "script",

		    		setting: {
		    			title: "template - tmlib.js",
						detail: "tmlib.js 用公式エディタ. 色々と使えますよ♪",
			    		fullscreen: false,
		    		},
		    		code: {
		    			html: {
		    				type: "html",
		    				value: document.querySelector("#template").innerHTML.replace(/__script__/g, 'script'),
		    			},
		    			style: {
		    				type: "css",
		    				value: document.querySelector("#template-css").innerHTML,
		    			},
		    			script: {
		    				type: "javascript",
		    				value: document.querySelector("#template-js").innerHTML,
		    			},
		    		},
		    	};
		    }
		    this.data = data;

		    // 一回キャッシュしておく
		    this.cache = JSON.stringify(this.data);

			// タイトル更新
			document.title = this.getTitle() + " | runstant";
		},

		getTitle: function() {
			return this.data.setting.title;
		},
		setTitle: function(v) {
			this.data.setting.title = v;
		},

		getDetail: function() {
			return this.data.setting.detail;
		},
		setDetail: function(v) {
			this.data.setting.detail = v;
		},
		
		getFullscreen: function() {
			return this.data.setting.fullscreen;
		},
		setFullscreen: function(flag) {
			this.data.setting.fullscreen = flag;
			return this;
		},

		getCurrent: function() {
			return this.data.current;
		},

		setCurrent: function(v) {
			this.data.current = v;
			return this;
		},

		setCurrentValue: function(value) {
	    	var data = this.data;
	    	data.code[data.current].value = value;
	    	return this;
	    },
	    getCurrentValue: function() {
	    	var data = this.data;
	    	return data.code[data.current].value;
	    },

	    getCurrentType: function() {
	    	var data = this.data;
	    	return data.code[data.current].type;
	    },

	    getCode: function(type) {
	    	var data = this.data;
	    	return data.code[type];
	    },

		toCode: function(debug) {
			var data = this.data;
			var setting = data.setting;
			var code = data.code;

			var prefix = '';
			var suffix = '';

			var htmlCode = (function() {
				var value = code.html.value;

				if (code.html.type == "jade") {
					value = rs.compiler.jade2html(value);
				}
				else if (code.html.type == "markdown") {
					value = rs.compiler.markdown2html(value);
				}

				return value;
			})();

			var cssCode = (function() {
				var value = code.style.value;

				if (code.style.type == "stylus") {
					value = rs.compiler.stylus2css(value);
				}
				else if (code.style.type == "less") {
					value = rs.compiler.less2css(value);
					console.log(value);
				}
				else if (code.style.type == "sass") {
					value = rs.compiler.sass2css(value);
				}

				return value;
			})();

			var jsCode = (function() {
				var value = code.script.value;

				if (code.script.type == "coffee") {
					value = rs.compiler.coffee2js(value);
				}
				else if (code.script.type == "typescript") {
					value = rs.compiler.typescript2js(value);
				}
				else if (code.script.type == "ecmascript6") {
					value = rs.compiler.es62js(value);
					prefix += sandScriptTag("http://cdn.rawgit.com/google/traceur-compiler/519f5663415cb825ead961177c4165d52721c33f/bin/traceur-runtime.js");
				}
				else if (code.script.type == "ruby") {
					value = rs.compiler.ruby2js(value);
					prefix += sandScriptTag("http://cdn.opalrb.org/opal/current/opal.min.js");
				}

				return value;
			})();

			var finalCode = htmlCode
		    	.replace("${title}", setting.title)
		    	.replace("${description}", setting.detail)
		    	.replace("${style}", cssCode)
		    	.replace("${script}", jsCode)
		    	;


		    finalCode = prefix + finalCode + suffix;

	    	if (debug === true) {
	    		var tag = "script";
			    finalCode = "<"+tag+">" + document.querySelector("#template-js-message").innerHTML + "</"+tag+">" + finalCode;
	    	}

		    return finalCode;
		},

	};

})();
