/*
 *
 */

var rs = {
	data: null,
	editor: null,
	preview: null,
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
					prefix += sandScriptTag("http://rawgit.com/google/traceur-compiler/gh-pages/bin/traceur-runtime.js");
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
		}
	};

})();
