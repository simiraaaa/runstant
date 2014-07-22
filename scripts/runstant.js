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

		    		setting: {
		    			title: "tmlib.js template",
						detail: "tmlib.js 用公式エディタ. ですが色々と使えますよ♪",
		    		},

		    		code: {
		    			current: "script",
		    			html: {
		    				type: "html",
		    				value: "hogehogehoge",
		    			},
		    			style: {
		    				type: "css",
		    				value: "hogehogehoge",
		    			},
		    			script: {
		    				type: "javascript",
		    				value: "hogehogehoge",
		    			},
		    		},
		    	};

		    	data = {
					version: '0.0.1',
					title: "tmlib.js template",
					detail: "tmlib.js 用公式エディタ. ですが色々と使えますよ♪",
					current: 'js',
		    		html: document.querySelector("#template").innerHTML.replace(/__script__/g, 'script'),
		    		css: document.querySelector("#template-css").innerHTML,
		    		js: document.querySelector("#template-js").innerHTML,
		    	};
		    }
		    this.data = data;

			// タイトル更新
			document.title = this.getTitle() + " | runstant";
		},

		getTitle: function() {
			return this.data.title;
		},
		setTitle: function(v) {
			this.data.title = v;
		},

		getDetail: function() {
			return this.data.detail;
		},
		setDetail: function(v) {
			this.data.detail = v;
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
	    	data[data.current] = value;
	    	return this;
	    },

	    getCurrentValue: function() {
	    	return this.data[this.data.current];
	    },

		toCode: function() {
			var data = this.data;
			var code = data.html
		    	.replace("{script}", data.js)
		    	.replace("{style}", data.css)
		    	;

		    return code;
		}
	};

})();