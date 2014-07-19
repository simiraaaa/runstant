
var editor = null;

window.onload = function() {
	setup();
	run();
};


var setup = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/html");

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


    // デフォルト
    var html = null;
    if (location.hash) {
    	html = window.atob(location.hash.substr(1));
    }
    else {
	    html = document.querySelector("#template").innerHTML;
	    html = html.replace(/__script__/g, 'script');
    }

    editor.setValue(html);
};


var run = function() {
    var preview = document.querySelector("#preview");
    var iframe = document.createElement("iframe");

    preview.innerHTML = "";
    preview.appendChild(iframe);

    var idoc = iframe.contentDocument;
    var html = editor.getValue();

    idoc.open();
    idoc.write(html);
    idoc.close();
};


var save = function() {
    var html = editor.getValue();

	location.hash = window.btoa(html);
};


