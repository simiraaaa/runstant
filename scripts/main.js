
//var $ = function(q) { return document.querySelector(q) };
var editor = null;
var cache = null;

window.onload = function() {
	setup();
	run();
};

// console 対応
window.onmessage = function(e) {
    var args = e.data.arguments;
    var arr = [];

    for (var key in args) {
        var d = args[key];
        arr.push(d);
    }

    if (e.data.method == "log") {
        rs.preview.log.apply(rs.preview, arr);
    }
    else if (e.data.method == "dir") {
        rs.preview.dir(args[0]);
    }


    // arr.unshift("[to child]");
    // console.log.apply(console, arr);
};




var setup = function() {

    rs.user = new rs.User({

    });
    // phi_jp 以外はアクセス禁止
    if (location.pathname == "/runstant/" && rs.user.getUsername() != "phi_jp") {
        location.pathname = "/runstant/release/alpha/";
    }

    rs.data = new rs.Data({

    });

    rs.editor = new rs.Editor({
        id: "editor",
    });

    rs.preview = new rs.Preview({
        query: "#preview",
    });

    // 
    $(window).on('popstate', function(e) {
        rs.data.load();
        rs.editor.setValue(rs.data.getCurrentValue());
        rs.editor.setMode(rs.data.getCurrentType());

        run();
    });

    setupEditor();
    setupAbout();
    setupSetting();
    setupUserSetting();
    setupShare();

    // support mobile
    var isMobile = (function() {
        var ua = navigator.userAgent;
        return (ua.indexOf("iPhone") > 0 || ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0);
    })();

    if (isMobile) {
        document.getElementById("editor").style.display = "none";
        document.getElementById("preview").style.width = "100%";
    }
};

var run = function() {
    rs.preview.run( rs.data.toCode(true) );
};

var save = function() {
    rs.data.save();
};

var load = function() {
    rs.data.load();
};


var setupEditor = function() {
    // デフォルト
    rs.editor.setValue(rs.data.getCurrentValue());
    rs.editor.setMode(rs.data.getCurrentType());

    // 編集の度
    editor = rs.editor.editor;
    editor.getSession().on('change', function(e) {
        var value = rs.editor.getValue();
        rs.data.setCurrentValue(value);
    });


    // ボタンの設定
    var buttons = document.querySelectorAll(".code-button");
    var each = Array.prototype.forEach;

    var changeType = function(type) {
        each.call(buttons, function(li) { li.classList.remove("active"); });

        // active
        var a = document.querySelector("a[data-type={type}]".replace("{type}", type));
        a.parentNode.classList.add("active");

        // 更新
        rs.data.setCurrent(type);
        
        rs.editor.setValue(rs.data.getCurrentValue());
        rs.editor.setMode(rs.data.getCurrentType());
    };


    each.call(buttons, function(li) {
        var a = li.querySelector('a');

        var langType = rs.data.data.code[a.dataset.type].type;
        a.innerHTML = langType;

        a.onclick = function(e) {
            var type = this.dataset.type;
            changeType(type);

            return false;
        };
    });

    $('#btn-run').on('click', function() {
        run(); return false;
    });
    $('#btn-save').on('click', function() {
        save();
        run();
        return false;
    });

    // 今のカレントタイプに切り替えておく
    changeType(rs.data.getCurrent());

    // ショートカットキーを登録
    var command = {
        name: "html",
        bindKey: { mac: "Alt-1", win: "Alt-1", },
        exec: function() { changeType("html"); }
    };
    editor.commands.addCommand(command);
    var command = {
        name: "style",
        bindKey: { mac: "Alt-2", win: "Alt-2", },
        exec: function() { changeType("style"); }
    };
    editor.commands.addCommand(command);
    var command = {
        name: "script",
        bindKey: { mac: "Alt-3", win: "Alt-3", },
        exec: function() { changeType("script"); }
    };
    editor.commands.addCommand(command);
};



var setupAbout = function() {
    document.querySelector("#btn-about").onclick = function() {
        $('#aboutModal').modal('show');

        return false;
    };
};


var setupSetting = function() {
    document.querySelector(".setting").onclick = function() {
		$('#input-title').val(rs.data.getTitle());
		$('#input-detail').val(rs.data.getDetail());

        $('#input-html').val(rs.data.getCode("html").type);
        $('#input-style').val(rs.data.getCode("style").type);
        $('#input-script').val(rs.data.getCode("script").type);

    	$('#settingModal').modal('show');

    	return false;
    };

	$('#settingModal').on('hidden.bs.modal', function (e) {
        console.log("close window");
	});

	$('#btn-setting-save').on("click", function() {
        rs.data.setTitle( $('#input-title').val() );
        rs.data.setDetail( $('#input-detail').val() );

        rs.data.getCode("html").type = $('#input-html').val();
        rs.data.getCode("style").type = $('#input-style').val();
        rs.data.getCode("script").type = $('#input-script').val();

        document.querySelector("a[data-type='html']").innerHTML = $('#input-html').val();
        document.querySelector("a[data-type='style']").innerHTML = $('#input-style').val();
        document.querySelector("a[data-type='script']").innerHTML = $('#input-script').val();

        rs.editor.setMode(rs.data.getCurrentType());

		save();


        // user data

        // username
        var username = $("#input-username").val();
        rs.user.setUsername(username);

        // theme
        var theme = $("#input-theme").val();
        rs.editor.setTheme(theme);
        rs.user.setTheme(theme);

        // key binding
        var keyBinding = $("#input-key-binding").val();
        rs.editor.setKeyboardHandler(keyBinding);
        rs.user.setKeyBinding(keyBinding);

        rs.user.save();
	});
};

var setupUserSetting = function() {
    // username
    var elmUser = $("#input-username");

    var username = rs.user.getUsername() || "runstant";
    elmUser.val(username);

    // theme
    var elmTheme = $("#input-theme");

    rs.Editor.themes.forEach(function(data) {
        var option = $('<option>');
        var name = data.name;
        var theme = data.theme;

        if (name == 'monokai') { name += '(default)'; }

        option.html(name);
        option.val(theme);
        elmTheme.append(option);
    });

    var theme = rs.user.getTheme();
    elmTheme.val(theme);
    rs.editor.setTheme(theme);

    // key binding
    var elmKeyBinding = $("#input-key-binding");

    ['ace(default)', 'vim', 'emacs'].forEach(function(name) {
        var option = $('<option>');

        option.html(name);
        option.val(name.replace(/\(.*\)/g, ''));
        elmKeyBinding.append(option);
    });

    var binding = rs.user.getKeyBinding();
    elmKeyBinding.val(binding);
    rs.editor.setKeyboardHandler(binding);

};

var setupShare = function() {
	var shortURL = this.location.href;

    document.querySelector(".share").onclick = function() {
    	if (location.protocol == "file:") {
	    	$('#shareModal').modal('show');
    	}
    	else {
	    	getShortURL(location.href, function(url) {
	    		shortURL = url;
		    	$('#short-url').val(url);
		    	$('#shareModal').modal('show');
	    	});
    	}

    	return false;
    };

	$('#shareModal').on('hidden.bs.modal', function (e) {
        console.log("close modal");
	});

	$('#btn-twitter').on('click', function() {
        rs.share.twitter({
            text: rs.data.getTitle(),
            url: shortURL,
        });
	});

	$('#btn-facebook').on('click', function() {
        rs.share.facebook({
            text: rs.data.getTitle(),
            url: shortURL,
        });
	});

	$('#btn-google').on('click', function() {
        rs.share.google({
            text: rs.data.getTitle(),
            url: shortURL,
        });
	});

    $('#btn-pocket').on('click', function() {
        rs.share.pocket({
            text: rs.data.getTitle(),
            url: shortURL,
        });
    });

    $('#btn-hatebu').on('click', function() {
        rs.share.hatebu({
            text: rs.data.getTitle(),
            url: shortURL,
        });
    });

	$('#btn-fullscreen').on('click', function() {
        var html = rs.data.toCode(true);

	    window.open("data:text/html;base64," + window.btoa( unescape(encodeURIComponent( html )) ));
	});

    var downloadButton = document.getElementById("btn-download");
    downloadButton.onclick = function() {
        var title = '{title}.html'
            .replace('{title}', rs.data.getTitle())
            .replace(/\s/g, '_')
            ;

        var text = rs.data.toCode(false);

        var blob = new Blob([text]);
        var url = window.URL.createObjectURL(blob);

        downloadButton.download = title;
        downloadButton.href = url;
    };

};

