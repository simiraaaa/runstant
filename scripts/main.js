
//var $ = function(q) { return document.querySelector(q) };
var data = {};
var editor = null;
var cache = null;

window.onload = function() {
	setup();
	run();
};


var setup = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setTabSize(4);
    editor.getSession().setUseSoftTabs(true);

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
    load();
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

	$('#btn-run').on('click', function() {
		run(); return false;
	});
	$('#btn-save').on('click', function() {
		save(); return false;
	});

    setupSetting();
    setupShare();


    // 
    $(window).on('popstate', function(e) {
    	load();
	    var txt = data[data.current];
	    editor.setValue(txt);
	    editor.getSession().setMode("ace/mode/" + getType(data.current));

	    run();
    });
};


var setupSetting = function() {
    document.querySelector(".setting").onclick = function() {
		$('#input-title').val(data.title);
		$('#input-detail').val(data.detail);

    	$('#settingModal').modal('show');

    	return false;
    };

	$('#settingModal').on('hidden.bs.modal', function (e) {
		console.dir(e);
		console.log("hoge");
	});

	$('#btn-setting-save').on("click", function() {
		data.title  = $('#input-title').val();
		data.detail = $('#input-detail').val();

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
		console.dir(e);
		console.log("hoge");
	});

	$('#btn-twitter').on('click', function() {
		var url = "https://twitter.com/intent/tweet?text={text}&hashtags=runstant&via={via}&url={url}";
		url = url.replace("{text}", encodeURIComponent(data.title));
		url = url.replace("{via}", "runstant");
		url = url.replace("{url}", encodeURIComponent(shortURL));
		window.open(url, 'share', 'width=640, height=480');
	});

	$('#btn-facebook').on('click', function() {
		var url = "https://www.facebook.com/sharer/sharer.php?u={url}";
		url = url.replace("{url}", encodeURIComponent(shortURL));
		window.open(url, 'share', 'width=640, height=480');
	});

	$('#btn-google').on('click', function() {
		var url = "https://plus.google.com/share?url={url}";
		url = url.replace("{url}", encodeURIComponent(shortURL));
		window.open(url, 'share', 'width=640, height=480');
	});

	$('#btn-pocket').on('click', function() {
		location.href = "javascript:(function(){var e=function(t,n,r,i,s){var o=[1629638,1714037,7233548,3108543,3554131,2369037,4788717,4648615,1850837,3441736];var i=i||0,u=0,n=n||[],r=r||0,s=s||0;var a={'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,'i':105,'j':106,'k':107,'l':108,'m':109,'n':110,'o':111,'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,'v':118,'w':119,'x':120,'y':121,'z':122,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'\/':47,':':58,'?':63,'=':61,'-':45,'_':95,'&':38,'$':36,'!':33,'.':46};if(!s||s==0){t=o[0]+t}for(var f=0;f<t.length;f++){var l=function(e,t){return a[e[t]]?a[e[t]]:e.charCodeAt(t)}(t,f);if(!l*1)l=3;var c=l*(o[i]+l*o[u%o.length]);n[r]=(n[r]?n[r]+c:c)+s+u;var p=c%(50*1);if(n[p]){var d=n[r];n[r]=n[p];n[p]=d}u+=c;r=r==50?0:r+1;i=i==o.length-1?0:i+1}if(s==180){var v='';for(var f=0;f<n.length;f++){v+=String.fromCharCode(n[f]%(25*1)+97)}o=function(){};return v+'ad170a63e8'}else{return e(u+'',n,r,i,s+1)}};var t=document,n=t.location.href,r=t.title;var i=e(n);var s=t.createElement('script');s.type='text/javascript';s.src='https://getpocket.com/b/r4.js?h='+i+'&u='+encodeURIComponent(n)+'&t='+encodeURIComponent(r);e=i=function(){};var o=t.getElementsByTagName('head')[0]||t.documentElement;o.appendChild(s)})();";
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

    // console.log(html);

    idoc.open();
    idoc.write(html);
    idoc.close();
};


var save = function() {
	// object -> string -> encode uri -> btoa -> zip
	// ↓こっちにする
	// object -> json stringify -> zip -> encode uri
	var d = data;
	d = JSON.stringify(d);

	if (cache != d) {
		cache = d;

		d = zip(d);
		d = encodeURI(d);

		// location.hash = encodeURI(d);
		history.pushState(null, 'runstant', '#' + encodeURI(d));
	}

	// タイトル更新
	document.title = data.title + " | runstant";
};

var load = function() {
	// decode uri -> unzip -> json parse -> object
    if (location.hash) {
    	var d = location.hash.substr(1);
    	d = decodeURI(d);
    	d = unzip(d);
    	d = JSON.parse(d);

    	data = d;
    }
    else {
    	data = {
			version: '0.0.1',
			title: "tmlib.js template",
			detail: "tmlib.js 用公式エディタ. ですが色々と使えますよ♪",
			current: 'js',
    		html: document.querySelector("#template").innerHTML.replace(/__script__/g, 'script'),
    		css: document.querySelector("#template-css").innerHTML,
    		js: document.querySelector("#template-js").innerHTML,
    	};
    }

	// タイトル更新
	document.title = data.title + " | runstant";
};


var zip = function(data) {
	var zip = new JSZip();
	zip.file('data', data);

	return zip.generate();
};


var unzip = function(data) {
	var zip = new JSZip();
	var files = zip.load(data, {
		base64: true
	});

	return files.file('data').asText();
};

var getType = function(key) {
	return {
		'html': 'html',
		'css': 'css',
		'js': 'javascript',
	}[key];
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
