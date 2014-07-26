

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

	console.log("hoge");

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
	return $.ajax({
		url: "https://www.googleapis.com/urlshortener/v1/url",
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
