

;(function() {
	var KEY = "user-setting-alpha";

	rs.User = function(param) {
		this.init(param);
	};

	rs.User.prototype = {
		init: function(param) {
			this.cache = null;
			this.load();
		},

		load: function() {
			var data = localStorage.getItem(KEY);

			if (data == null) {
				data = {
					username: "runstant",
					keyBinding: 'ace',
					theme: "ace/theme/monokai",
					tabSize: 4,
				};
			}
			else {
				data = _decode(data);
				if (data.tabSize == null) data.tabSize = 4;
			}

			this.data = data;

			console.debug("user.load", this.data);
		},

		save: function() {
			var dataStr = _encode(this.data);
			localStorage.setItem(KEY, dataStr);

			console.debug("user.save", this.data);
		},

		setUsername: function(v) {
			this.data.username = v;
			return this;
		},
		getUsername: function() {
			return this.data.username;
		},

		setTheme: function(v) {
			this.data.theme = v;
			return this;
		},
		getTheme: function() {
			return this.data.theme;
		},

		setKeyBinding: function(v) {
			this.data.keyBinding = v;
			return this;
		},
		getKeyBinding: function() {
			return this.data.keyBinding;
		},

		setTabSize: function(v) {
			this.data.tabSize = v;
			return this;
		},
		getTabSize: function() {
			return this.data.tabSize;
		},
	};

})();
