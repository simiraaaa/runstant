/*
 *
 */


(function (exports) {

	var isNode = (typeof process !== "undefined" && typeof require !== "undefined");
	var JSZip = (isNode) ? require('request') : window.JSZip;
	var request = (isNode) ? require('request') : null;

	exports.zip = function(data) {
		var zip = new JSZip();
		zip.file('data', data);

		return zip.generate({type:"base64"});
	};

	exports.unzip = function(data) {
		var zip = new JSZip();
		var files = zip.load(data, {
			base64: true
		});

		return files.file('data').asText();
	};

	exports.json2hash = function(obj) {
	    var str = JSON.stringify(obj);
	    var zipedFile = this.zip(str);
	    return encodeURI(zipedFile);
	};

	exports.hash2json = function(data) {
		data = decodeURI(data);
		data = this.unzip(data);
		data = JSON.parse(data);
		return data;
	};

	exports.jade2html = function(code) {
		var source = jade.compile(code, {
			pretty: true
		});
		return '<!-- Compiled Jade -->\n\n' + source();
	};

	exports.markdown2html = function(code) {
		var source = marked(code);

		return '<!-- Compiled Markdown -->\n\n' + source;
	};

	exports.less2css = function(code) {
		// console.dir(less.Parser());
		var source = '';
		less.Parser().parse(code, function(err, tree) {
			if (err) {
				return console.error(err)
			}
			source = tree.toCSS();
		});

		return '/* Compiled LESS */\n\n' + source;
	};

	exports.sass2css = function(code) {
		var css = Sass.compile(code);
		return '/* Compiled SASS */\n\n' + css;
	};

	exports.stylus2css = function(code) {
		var source = '';
		var renderer = stylus(code);

		renderer.render(function(a, b) {
			source = b;
		});

		return '/* Compiled Stylus */\n\n' + source;
	};

	// 動的にスクリプトをロードする
	exports.loadScript = function(path, callback) {
		if (exports.loadScript.cache[path]) {
			return ;
		}

		$.getScript(path, callback);
		exports.loadScript.cache[path] = true;
	};
	exports.loadScript.cache = {};

	exports.shorten = function(url, callback) {
		if (isNode) {
			var key = "AIzaSyCfmMcmHwD_YN8vXQjJwojUP-4xKHHdaoI";

			var options = {
				url: "https://www.googleapis.com/urlshortener/v1/url?key=" + key,
				headers: {
					'Content-Type': 'application/json'
				},
				json: true,
				body: JSON.stringify({
					longUrl: url
				}),
			};

			request.post(options, function(error, response, body) {
				if (error) {
					console.log('error: ' + response.statusCode);
					return ;
				}

				console.log(body.error);
				if (response.statusCode == 200) {
					callback(body.id);
				}
			});
		}
		else {
			var key = {
				"junk.tmlife.net": "AIzaSyAZiKPSew71cIg8hjwzlF_fYJ4vfi_rDgw",
				"phi-jp.github.io": "AIzaSyDhmy80EsFt4SjFnI5syKzBu1idEp1jBi4",
			}[document.domain];

			return $.ajax({
				url: "https://www.googleapis.com/urlshortener/v1/url?key=" + key,
				type: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					longUrl: url,
				}),
				dataType: "json",
				success: function(res) {
					return callback(res.id);
				},
				error: function(err) {
					return console.error(err);
				},
			});

		}
	};


	// extend console
	util.ConsoleExtention = function() {
		var _log = console.log;

		console.log = function() {
			_log.apply(console, arguments);

			var arguments = Array.prototype.slice.call(arguments);
			var message = {
				method: "log",
				arguments: arguments
			};

			window.parent.postMessage(JSON.stringify(message), "*");
		};

		window.onmessage = function(e) {
			var result = eval(e.data);
			if (!result) result = result + '';

			var message = {
				method: "output",
				arguments: [result],
			};
			window.parent.postMessage(JSON.stringify(message), "*");
		};
	};


	// for node
	if (!isNode) return ;

	var spawn = require('child_process').spawn;

	exports.open = function(url) {
	    spawn("open", [url]);
	};

})(typeof exports === 'undefined' ? this.util = {} : exports);