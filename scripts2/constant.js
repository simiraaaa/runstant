
(function (exports) {

	exports.TEMPLATE_HTML = "\<!DOCTYPE html\>\n\
 \n\
\<html\>\n\
    \<head\>\n\
        \<meta charset=\"UTF-8\" /\>\n\
        \<meta name=\"viewport\" content=\"width=device-width, user-scalable=no\" /\>\n\
        \<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" /\>\n\
 \n\
        \<title\>${title}\</title\>\n\
        \<meta name=\"description\" content=\"${description}\" /\>\n\
\n\
        \<style\>${style}\</style\>\n\
\n\
        \<script src=\"http://cdn.rawgit.com/phi-jp/high/0.0.3/high.js\"\>\</script\>\n\
		\<script\>${script}\</script\>\n\
    \</head\>\n\
    \<body\>\n\
        \<h1\>Hello, runstant!\</h1\>\n\
    \</body\>\n\
\</html\>";

	exports.TEMPLATE_CSS = "body {\n\
    background-color: rgb(252, 252, 254);\n\
}\n\
\n\
h1 {\n\
    color: #444;\n\
    font-size: 23px;\n\
    font-family: \'Lucida Grande\',\'Hiragino Kaku Gothic ProN\', Meiryo, sans-serif;\n\
}";
	exports.TEMPLATE_JS = 'console.log("Hello, runstant!");';

	exports.TEMPLATE_DATA = {
	    version: '0.0.1',
	    current: "script",

	    setting: {
	        title: "template - tmlib.js",
	        detail: "tmlib.js 用公式エディタ. 色々と使えますよ♪",
	        fullscreen: false,
	    },
	    code: {
	        html: {
	            type: "html",
	            value: exports.TEMPLATE_HTML,
	        },
	        style: {
	            type: "css",
	            value: exports.TEMPLATE_CSS,
	        },
	        script: {
	            type: "javascript",
	            value: exports.TEMPLATE_JS,
	        },
	    },
	};

	exports.RUNSTANT_URL = "http://phi-jp.github.io/runstant/release/alpha/index.html";

})(typeof exports === 'undefined' ? this.constant = {} : exports);