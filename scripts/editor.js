

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

		setValue: function(v) {
			this.editor.setValue(v);
			// this.editor.setValue(v, -1);
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
	};

})();