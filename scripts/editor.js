

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
			return this;
		},

		getValue: function(v) {
			return this.editor.getValue();
		},

		setMode: function(key) {
			this.editor.getSession().setMode("ace/mode/" + this.keyToType(key));
			return this;
		},

		keyToType: function(key) {
			return {
				'html': 'html',
				'css': 'css',
				'js': 'javascript',
			}[key];
		},
	};

})();