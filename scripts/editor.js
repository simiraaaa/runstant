

;(function() {

	rs.Editor = function(param) {
		this.init(param);
	};

	rs.Editor.prototype = {
		init: function(param) {
			this.editor = ace.edit(param.id);

			var editor = this.editor;

		    editor.setTheme("ace/theme/monokai");
		    editor.getSession().setTabSize(4);
		    editor.getSession().setUseSoftTabs(true);
		    editor.setOption("enableEmmet", true);

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

		    // 左右移動
		    var command = {
		        name: "go to word right",
		        bindKey: {
		            mac: "Ctrl-Right",
		            win: "Ctrl-Right",
		        },
		        exec: function() {
		        	editor.navigateWordRight();
		        }
		    };
		    editor.commands.addCommand(command);
		    var command = {
		        name: "go to word left",
		        bindKey: {
		            mac: "Ctrl-Left",
		            win: "Ctrl-Left",
		        },
		        exec: function() {
		        	editor.navigateWordLeft();
		        }
		    };
		    editor.commands.addCommand(command);
		    var command = {
		        name: "selectwordright2",
		        bindKey: {
		            mac: "Ctrl-Shift-Right",
		            win: "Ctrl-Shift-Right",
		        },
		        exec: function() {
			    	editor.getSelection().selectWordRight();
		        }
		    };
		    editor.commands.addCommand(command);
		    var command = {
		        name: "selectwordleft2",
		        bindKey: {
		            mac: "Ctrl-Shift-Left",
		            win: "Ctrl-Shift-Left",
		        },
		        exec: function() {
			    	editor.getSelection().selectWordLeft();
		        }
		    };
		    editor.commands.addCommand(command);



		    // ヘルプ
		    var command = {
		        name: "help",
		        bindKey: {
		            mac: "Ctrl-/",
		            win: "Ctrl-/",
		        },
		        exec: function() {
		        	window.open("https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts");
		        }
		    };
		    editor.commands.addCommand(command);

			editor.setOptions({
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: true
			});


			/*

			this.addGutterDecoration(0,"highlight_line");
			this.addGutterDecoration(5,"highlight_line");
			this.addGutterDecoration(10,"highlight_line");
			this.addGutterDecoration(15,"highlight_line");

			this.editor.on("guttermousedown", function(e){ 
				// var index = e.$pos.row;
				var target = e.domEvent.target;
				target.classList.toggle("highlight_line");

				var row = e.getDocumentPosition().row;

				// setAnnotations((+target.innerHTML)-1, "hogehoge");

				e.stop();
			});
*/

			/*
			this.editor.on("guttermousemove", function(e){ 
				var target = e.domEvent.target;
				target.classList.toggle("highlight_line");

				var row = e.getDocumentPosition().row;
				console.log(row);

				e.stop();
			});
*/

			// ライン数要素取得
			// editor.renderer.$gutterLayer.$cells;

			// アノテーションの追加
			/*
			var setAnnotations = function(row, text, type) {
				this.editor.session.setAnnotations([
					{
						row: row,
						text: text,
						type: type || "info",
					}
				]);
			}.bind(this);
			*/

			/*
editorsession.setAnnotations([{ 
                  row: editorcursor.row, 
                  column: editorcursor.column, 
                  text: "Strange error", 
                  type: "info" 
                }]); 
			*/

			/*
			this.editor.on("guttermousemove", function(e){ 
				var target = e.domEvent.target;
				target.classList.toggle("highlight_line");

				var row = e.getDocumentPosition().row;
				console.log(row);

				e.stop();
			});
*/
		},

		addCommand: function(command) {
		    editor.commands.addCommand(command);
			return this;
		},

		addGutterDecoration: function(line, className) {
			this.editor.getSession().addGutterDecoration(line, className);
			return this;
		},

		setValue: function(v) {
			this.editor.setValue(v, -1);
			// this.editor.setValue(v, 1);

			/* マーカつけるテスト
			ace.require("ace/multi_select").MultiSelect(this.editor);

			setTimeout(function() {
				var Range = ace.require('ace/range').Range;
				var range = new Range(1, 0, 2, 10);
				
				// var sel = this.editor.session.selection;
				// sel.addRange(new Range(1, 0, 1, 9999));
				// sel.addRange(new Range(3, 0, 3, 9999));

				// var range = new Range(0, 0, 1, 1);
				// this.editor.getSelection().setSelectionRange(range, false);

				var marker = this.editor.getSession().addMarker(range,"ace_selected_word", "text");
			}.bind(this), 1);
*/


			return this;
		},

		getValue: function(v) {
			return this.editor.getValue();
		},

		setMode: function(type) {
			var map = {
				"ecmascript6": "javascript",
				"sass": "scss",
			};
			if (map[type]) type = map[type];

			this.editor.getSession().setMode("ace/mode/" + type);
			return this;
		},

		setTheme: function(theme) {
			this.editor.setTheme(theme);
		},

		setTabSize: function(tabSize) {
			tabSize = Number(tabSize);
		    this.editor.getSession().setTabSize(tabSize);
		},

		setKeyboardHandler: function(key) {
			var keybindings = {
				'ace': null,	// default
				'vim': "ace/keyboard/vim",
				'emacs': "ace/keyboard/emacs",
			};
			this.editor.setKeyboardHandler(keybindings[key]);

			return this;
		},
	};

	var themeData = [
	    ["Chrome"         ],
	    ["Clouds"         ],
	    ["Crimson Editor" ],
	    ["Dawn"           ],
	    ["Dreamweaver"    ],
	    ["Eclipse"        ],
	    ["GitHub"         ],
	    ["Solarized Light"],
	    ["TextMate"       ],
	    ["Tomorrow"       ],
	    ["XCode"          ],
	    ["Kuroir"],
	    ["KatzenMilch"],
	    ["Ambiance"             ,"ambiance"                ,  "dark"],
	    ["Chaos"                ,"chaos"                   ,  "dark"],
	    ["Clouds Midnight"      ,"clouds_midnight"         ,  "dark"],
	    ["Cobalt"               ,"cobalt"                  ,  "dark"],
	    ["idle Fingers"         ,"idle_fingers"            ,  "dark"],
	    ["krTheme"              ,"kr_theme"                ,  "dark"],
	    ["Merbivore"            ,"merbivore"               ,  "dark"],
	    ["Merbivore Soft"       ,"merbivore_soft"          ,  "dark"],
	    ["Mono Industrial"      ,"mono_industrial"         ,  "dark"],
	    ["Monokai"              ,"monokai"                 ,  "dark"],
	    ["Pastel on dark"       ,"pastel_on_dark"          ,  "dark"],
	    ["Solarized Dark"       ,"solarized_dark"          ,  "dark"],
	    ["Terminal"             ,"terminal"                ,  "dark"],
	    ["Tomorrow Night"       ,"tomorrow_night"          ,  "dark"],
	    ["Tomorrow Night Blue"  ,"tomorrow_night_blue"     ,  "dark"],
	    ["Tomorrow Night Bright","tomorrow_night_bright"   ,  "dark"],
	    ["Tomorrow Night 80s"   ,"tomorrow_night_eighties" ,  "dark"],
	    ["Twilight"             ,"twilight"                ,  "dark"],
	    ["Vibrant Ink"          ,"vibrant_ink"             ,  "dark"]
	];


	rs.Editor.themesByName = {};

	/**
	 * An array containing information about available themes.
	 */
	rs.Editor.themes = themeData.map(function(data) {
	    var name = data[1] || data[0].replace(/ /g, "_").toLowerCase();
	    var theme = {
	        caption: data[0],
	        theme: "ace/theme/" + name,
	        isDark: data[2] == "dark",
	        name: name
	    };
	    rs.Editor.themesByName[name] = theme;
	    return theme;
	});

})();