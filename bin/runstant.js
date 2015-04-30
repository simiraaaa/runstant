
var fs = require('fs');
// var jszip = require('jszip');
var spawn = require('child_process').spawn;
var constant = require(__dirname + "/../scripts2/constant");

var RUNSTANT_URL = "http://phi-jp.github.io/runstant/release/alpha/index.html";



var open = function(url) {
    spawn("open", [url]);
};


// open(RUNSTANT_URL);