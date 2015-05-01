/*
 *
 */


(function (exports) {

	var isNode = (typeof process !== "undefined" && typeof require !== "undefined");
	var JSZip = JSZip || require('jszip');
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
		data = this.unzip(str);
		data = JSON.parse(data);
		return data;
	};

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


	// for node
	if (!isNode) return ;

	var spawn = require('child_process').spawn;

	exports.open = function(url) {
	    spawn("open", [url]);
	};

})(typeof exports === 'undefined' ? this.util = {} : exports);