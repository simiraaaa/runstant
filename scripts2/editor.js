
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
                editor.commands.addCommand(command);
            });

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

        addCommand: function() {
            // TODO 
        },
    };


    var defaults = {
        commands: [
            {
                name: "save",
                bindKey: { mac: "Command-S", win: "Ctrl-S", },
                exec: function() {
                    Materialize.toast('save & play', 1000, "rounded");
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
