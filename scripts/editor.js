

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

		},

		addCommand: function(command) {
		    editor.commands.addCommand(command);
		},

		setValue: function(v) {
			this.editor.setValue(v, -1);
			// this.editor.setValue(v, 1);
			return this;
		},

		getValue: function(v) {
			return this.editor.getValue();
		},

		setMode: function(type) {
			this.editor.getSession().setMode("ace/mode/" + type);
			return this;
		},

		setTheme: function(theme) {
			editor.setTheme(theme);
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