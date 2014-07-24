

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

var coffeescript2js = function(code) {
	var source = CoffeeScript.compile(code);

	return '// Compiled CoffeeScript\n\n' + source;
};
// // test
// var code = coffeescript2js('console.log "coffee だよ!"');
// console.log(code);



var typescript2js = function(code) {
	var outfile = {
		source: '',
		Write: function(s) {
			this.source += s;
		},
		WriteLine: function(s) {
			this.source += s + '\n';
		},
		Close: function() {

		},
	};
	var outerror = {
		source: '',
		Write: function(s) { },
		WriteLine: function(s) { },
		Close: function() { },
	};

	var compiler = new TypeScript.TypeScriptCompiler(outfile, outerror);

	compiler.addUnit(code, '');
	compiler.emit(false, function createFile(fileName) {
	    return outfile;
	});

	return '// Compiled TypeScript\n\n' + outfile.source;
};

// // test
// var code = typescript2js('var isDone: boolean = false;');
// console.log(code);

