/*
 *
 */

var rs = {
	data: null,
	editor: null,
	preview: null,
};


;(function() {

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
				history.pushState(null, 'runstant', '#' + encodeURI(d));
			}

			// タイトル更新
			document.title = this.getTitle() + " | runstant";
		},

		load: function() {
			var data = null;
			// decode uri -> unzip -> json parse -> object
		    if (location.hash) {
		    	var d = location.hash.substr(1);
		    	d = decodeURI(d);
		    	d = unzip(d);
		    	d = JSON.parse(d);

		    	data = d;
		    }
		    else {
		    	data = {
		    		version: '0.0.1',
	    			current: "script",

		    		setting: {
		    			title: "tmlib.js template",
						detail: "tmlib.js 用公式エディタ. ですが色々と使えますよ♪",
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

		toCode: function() {
			var data = this.data;
			var setting = data.setting;
			var code = data.code;
			var html = code.html.value
		    	.replace("${title}", setting.title)
		    	.replace("${description}", setting.description)
		    	.replace("${style}", code.style.value)
		    	.replace("${script}", code.script.value)
		    	;

		    return html;
		}
	};

})();