

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

var jade2html = function(code) {
	var source = jade.compile(code, {
		pretty: true
	});
	return '<!-- Compiled Jade -->\n\n' + source();
};
// test
var code = jade2html('html\n  head\n  body');
console.log(code);

var coffee2js = function(code) {
	var source = CoffeeScript.compile(code);

	return '// Compiled CoffeeScript\n\n' + source;
};
// // test
// var code = coffee2js('console.log "coffee だよ!"');
// console.log(code);

var es62js = function(code) {
    var compiler = new traceur.Compiler();
    var result = compiler.stringToString(code);
    var code = result.js.match(/"use strict";([\s\S]*)return/m)[1];

	return '// Compiled ECMAScript 6\n\n' + code;
};
// test
var code = es62js('console.log("ECMAScript 6 だよ!")');
console.log(code);


var less2css = function(code) {
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
// test
var code = less2css('body { #hoge { background: "red"; } }');
console.log(code);


var stylus2css = function(code) {
	var source = '';
	var renderer = stylus(code);

	renderer.render(function(a, b) {
		source = b;
	});

	return '/* Compiled Stylus */\n\n' + source;
};
// test
var code = stylus2css('body\n  background: "red"');
console.log(code);



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

