
var fs = require('fs');
var json5 = require('json5');
var jszip = require('jszip');
var spawn = require('child_process').spawn;
var constant = require(__dirname + "/../scripts2/constant");

var RUNSTANT_URL = "http://phi-jp.github.io/runstant/release/alpha/index.html";


var open = function(url) {
    spawn("open", [url]);
};

var filename = process.argv[2];
var text = fs.readFileSync(filename, 'utf-8');
var data = json5.parse(text);


if (!data.code.html.value) {
    data.code.html.value = constant.TEMPLATE_HTML;
}
if (!data.code.style.value) {
    data.code.style.value = constant.TEMPLATE_CSS;
}

if (data.code.script.file) {
    data.code.script.value = fs.readFileSync("examples/hello/" + data.code.script.file, 'utf-8');
}
else if (!data.code.script.value) {
    data.code.script.value = constant.TEMPLATE_JS;
}


var json2hash = function(obj) {
    var str = JSON.stringify(obj);

    var jsz = new jszip();
    jsz.file("data", str);
    var zipFile = jsz.generate();

    return encodeURI(zipFile);
};

var str = json2hash(data);
var url = RUNSTANT_URL + "#" + str;

open(url);

