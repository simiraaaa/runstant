
var data = {};
var editor = null;

window.onload = function() {
	setup();
	run();
};


var setup = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");

    var command = {
        name: "run",
        bindKey: {
            mac: "Command-Enter",
            win: "Ctrl-Enter",
        },
        exec: function() {
            console.log("run");
            run();
        }
    };
    editor.commands.addCommand(command);

    var command = {
        name: "save",
        bindKey: {
            mac: "Command-S",
            win: "Ctrl-S",
        },
        exec: function() {
            console.log("save");
            save();
            run();
        }
    };
    editor.commands.addCommand(command);

    // 編集の度
    editor.getSession().on('change', function(e) {
    	var current = data.current;
    	data[current] = editor.getValue();
    	// console.log(e.type);
    });


    // デフォルト
    var html = null;
    if (location.hash) {
    	var dataString = window.atob(location.hash.substr(1));
    	data = JSON.parse(dataString);
    	html = data.html;
    }
    else {
    	data = {
			version: '0.0.1',
			current: 'js',
    		html: document.querySelector("#template").innerHTML.replace(/__script__/g, 'script'),
    		css: document.querySelector("#template-css").innerHTML,
    		js: document.querySelector("#template-js").innerHTML,
    	};
    }

    var txt = data[data.current];
    editor.setValue(txt);

    editor.getSession().setMode("ace/mode/" + getType(data.current));

    // ボタンの設定
    var buttons = document.querySelectorAll(".code-button");
    var each = Array.prototype.forEach;

    each.call(buttons, function(button) {
	    button.onclick = function(e) {
	    	var key = this.innerHTML;
	    	
	    	data.current = key;

	    	editor.setValue(data[key]);
		    editor.getSession().setMode("ace/mode/" + getType(data.current));

		    return false;
	    };
    });
};


var run = function() {
    var preview = document.querySelector("#preview");
    var iframe = document.createElement("iframe");

    preview.innerHTML = "";
    preview.appendChild(iframe);

    var idoc = iframe.contentDocument;
    var html = data.html;

    html = html.replace("{script}", data.js);
    html = html.replace("{style}", data.css);

    console.log(html);

    idoc.open();
    idoc.write(html);
    idoc.close();
};


var save = function() {
    var html = editor.getValue();
    var dataString = JSON.stringify(data);

	location.hash = window.btoa(dataString);
};


var getType = function(key) {
	return {
		'html': 'html',
		'css': 'css',
		'js': 'javascript',
	}[key];
};

