
var runstant = runstant || {};

;(function() {

    var Editor = function(param) {
        this.init(param);
    };

    Editor.prototype = {

        init: function(param) {
            this.editors = {};
        },

        register: function(key, id, mode) {
            var editor = ace.edit(id);
            editor.setTheme("ace/theme/monokai");

            defaults.commands.forEach(function(command) {
                command.exec = command.exec.bind(this);
                editor.commands.addCommand(command);
            }, this);

            this.editors[key] = editor;

            this.setMode(key, mode);
        },

        setValue: function(key, value) {
            var editor =this.editors[key];
            editor.setValue(value);
        },

        getValue: function(key) {
            var editor =this.editors[key];
            return editor.getValue();
        },

        setMode: function(key, mode) {
            var map = {
                "ecmascript6": "javascript",
                "sass": "scss",
            };
            if (map[mode]) mode = map[mode];

            var editor =this.editors[key];
            editor.getSession().setMode("ace/mode/" + mode);

            return this;
        },

        setTheme: function(theme) {
            Object.keys(this.editors).forEach(function(key) {
                var editor = this.editors[key];
                editor.setTheme(theme);
            }, this);
        },

        setFontSize: function(size) {
            Object.keys(this.editors).forEach(function(key) {
                var editor = this.editors[key];
                editor.setFontSize(+size);
            }, this);
        },

        addCommand: function() {
            // TODO 
        },

        onsave: function() {

        },
    };


    var defaults = {
        commands: [
            {
                name: "save",
                bindKey: { mac: "Command-S", win: "Ctrl-S", },
                exec: function() {
                    this.onsave && this.onsave();
                }
            },
            // 左右移動
            {
                name: "go to word right",
                bindKey: {
                    mac: "Ctrl-Right",
                    win: "Ctrl-Right",
                },
                exec: function(e) {
                    e.navigateWordRight();
                }
            },
            {
                name: "go to word left",
                bindKey: {
                    mac: "Ctrl-Left",
                    win: "Ctrl-Left",
                },
                exec: function(e) {
                    e.navigateWordLeft();
                }
            },
            {
                name: "selectwordright2",
                bindKey: {
                    mac: "Ctrl-Shift-Right",
                    win: "Ctrl-Shift-Right",
                },
                exec: function(e) {
                    e.getSelection().selectWordRight();
                }
            },
            {
                name: "selectwordleft2",
                bindKey: {
                    mac: "Ctrl-Shift-Left",
                    win: "Ctrl-Shift-Left",
                },
                exec: function(e) {
                    e.getSelection().selectWordLeft();
                }
            },
        ],
    }


    runstant.Editor = Editor;

})();



;(function() {

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


    runstant.Editor.themesByName = {};

    /**
     * An array containing information about available themes.
     */
    runstant.Editor.themes = themeData.map(function(data) {
        var name = data[1] || data[0].replace(/ /g, "_").toLowerCase();
        var theme = {
            caption: data[0],
            theme: "ace/theme/" + name,
            isDark: data[2] == "dark",
            name: name
        };
        runstant.Editor.themesByName[name] = theme;
        return theme;
    });

})();