

var _encode = function(data) {
	data = JSON.stringify(data);
	data = zip(data);
	data = encodeURI(data);

	return data;
};

var _decode = function(data) {
	data = decodeURI(data);
	data = unzip(data);
	data = JSON.parse(data);

	return data;
};


var zip = function(data) {
	var zip = new JSZip();
	zip.file('data', data);

	return zip.generate({type:"base64"});
};


var unzip = function(data) {
	var zip = new JSZip();
	var files = zip.load(data, {
		base64: true
	});

	return files.file('data').asText();
};


var getShortURL = function(url, callback) {
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
};


var loadScript = function(path, callback) {
	if (loadScript.cache[path]) {
		return ;
	}

	$.getScript(path, callback);
	loadScript.cache[path] = true;
};
loadScript.cache = {};

/**
 * 短縮URLにアクセス可能か確認
 * @param url 短縮URL
 * @param success アクセスできたときに実行される関数
 * @param error アクセスできなかったときに実行される関数
 * 
 * {
 *  url:url,
 *  success:success,
 *  error:error,
 * }
 * という形式でもOK
 */
var tryAccess = function (url, success, error) {
    if (typeof url !== 'string') {
        url = url.url;
        success = url.success;
        error = url.error;
    }

    success = success || function () { };
    error = error || function () { };
    var frame = document.createElement('iframe');

    frame.src = url;
    frame.style.display = 'none';
    frame.onload = function () {
        try {
            this.contentDocument;
            success();
        } catch (e) {
            error(e);
        } finally {
            this.parentNode.removeChild(this);
        }
    };

    document.body.appendChild(frame);
};

