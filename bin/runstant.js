
var fs = require('fs');
var path = require('path');
var json5 = require('json5');
var jszip = require('jszip');
var constant = require(__dirname + "/../scripts2/constant");
var util = require(__dirname + "/../scripts2/util");

/*
 * runstant.json から data を構築
 */
var filename = process.argv[2];
if (/runstant\.json$/.test(filename) === false) {
    filename = path.join(filename, 'runstant.json');
}
var dirname = path.dirname(filename);
var text = fs.readFileSync(filename, 'utf-8');
var data = json5.parse(text);

if (!data.code.html.value) {
    data.code.html.value = constant.TEMPLATE_HTML;
}
if (!data.code.style.value) {
    data.code.style.value = constant.TEMPLATE_CSS;
}

if (data.code.script.file) {
    var jsfile = path.join(dirname, data.code.script.file);
    data.code.script.value = fs.readFileSync(jsfile, 'utf-8');
}
else if (!data.code.script.value) {
    data.code.script.value = constant.TEMPLATE_JS;
}


var hash = util.json2hash(data);
var url = constant.RUNSTANT_URL + "#" + hash;

// util.open(url);

util.shorten(url, function(url) {
    console.log(url);
});
