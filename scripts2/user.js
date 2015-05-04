runstant = runstant || {};

;(function() {

	var LOCAL_STORAGE_KEY = 'runstant-user-setting-beta';

    var User = function(param) {
        this.init(param);
    };

    User.prototype = {
    	init: function(param) {
            this.load();
    	},

        load: function() {
            this.data = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (!this.data) {
                this.data = {
                    username: 'runstant',
                    keyBinding: 'ace',
                    theme: 'monokai',
                    fontSize: 12,
                    tabSize: 4,
                };
                this.save();
            }
            else {
                var zipedData = localStorage.getItem(LOCAL_STORAGE_KEY);
                var strData = util.unzip(zipedData);
                this.data = JSON.parse(strData);
            }

            return this;
        },

        save: function() {
            var strData = JSON.stringify(this.data);
            var zipedData = util.zip(strData);
            localStorage.setItem(LOCAL_STORAGE_KEY, zipedData);

            return this;
        },
    };

    runstant.User = User;

})();
