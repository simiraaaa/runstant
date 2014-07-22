
//var $ = function(q) { return document.querySelector(q) };
var editor = null;
var cache = null;

window.onload = function() {
	setup();
	run();
};


var setup = function() {

    rs.data = new rs.Data({

    });
    rs.data.load();

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
        rs.editor.setMode(rs.data.getCurrent());

        run();
    });

    setupEditor();
    setupSetting();
    setupShare();
};

var run = function() {
    rs.preview.run( rs.data.toCode() );
};

var save = function() {
    rs.data.save();
    run();
};

var load = function() {
    rs.data.load();
};



var setupEditor = function() {
    // デフォルト
    rs.editor.setValue(rs.data.getCurrentValue());
    rs.editor.setMode(rs.data.getCurrent());


    // 編集の度
    editor = rs.editor.editor;
    editor.getSession().on('change', function(e) {
        var value = rs.editor.getValue();
        console.log(value);
        rs.data.setCurrentValue(value);
    });

    // ボタンの設定
    var buttons = document.querySelectorAll(".code-button");
    var each = Array.prototype.forEach;

    each.call(buttons, function(button) {
        button.onclick = function(e) {
            var key = this.innerHTML;

            rs.data.setCurrent(key);
            
            rs.editor.setValue(rs.data.getCurrentValue());
            rs.editor.setMode(rs.data.getCurrent());

            return false;
        };
    });

    $('#btn-run').on('click', function() {
        run(); return false;
    });
    $('#btn-save').on('click', function() {
        save(); return false;
    });
};



var setupSetting = function() {
    document.querySelector(".setting").onclick = function() {
		$('#input-title').val(rs.data.getTitle());
		$('#input-detail').val(rs.data.getDetail());

    	$('#settingModal').modal('show');

    	return false;
    };

	$('#settingModal').on('hidden.bs.modal', function (e) {
        console.log("close window");
	});

	$('#btn-setting-save').on("click", function() {
        rs.data.setTitle( $('#input-title').val() );
        rs.data.setDetail( $('#input-detail').val() );

		save();
	});
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

	$('#btn-fullscreen').on('click', function() {
        var html = rs.data.toCode();

	    window.open("data:text/html;base64," + window.btoa( unescape(encodeURIComponent( html )) ));
	});

    var downloadButton = document.getElementById("btn-download");
    downloadButton.onclick = function() {
        var title = '{title}.html'
            .replace('{title}', rs.data.getTitle())
            .replace(/\s/g, '_')
            ;

        var text = rs.data.toCode();

        var blob = new Blob([text]);
        var url = window.URL.createObjectURL(blob);

        downloadButton.download = title;
        downloadButton.href = url;
    };

};

