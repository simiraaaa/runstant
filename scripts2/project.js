
var runstant = runstant || {};

;(function() {

    var Project = function() {
        this.init();
    };

    Project.prototype = {
        data: null,
        cache: null,

        init: function() {
            this.load();
        },

        load: function() {
            var data = null;

            if (location.hash) {
                var hash = location.hash.substr(1);
                data = util.hash2json(hash);
            }
            else {
                data = constant.TEMPLATE_DATA;
            }

            this.data = data;

            // キャッシュしておく
            this.cache = JSON.stringify(this.data);
            // タイトル更新
            document.title = this.getTitle() + " | runstant";
        },

        save: function() {
        	var dataString = JSON.stringify(this.data);

        	if (this.cache !== dataString) {
        		this.cache = dataString;

        		var hash = util.json2hash(this.data);
        		history.pushState(null, 'runstant', '#' + hash);

				// タイトル更新
				document.title = this.getTitle() + " | runstant";
        	}
        },

        getTitle: function() {
            return this.data.setting.title;
        },
        setTitle: function(v) {
            this.data.setting.title = v;
        },

        toCode: function() {
			var data = this.data;
			var setting = data.setting;
			var code = data.code;

        	var htmlCode = code.html.value;
        	var cssCode = code.style.value;
        	var jsCode = code.script.value;

			var finalCode = htmlCode
		    	.replace("${title}", setting.title)
		    	.replace("${description}", setting.detail)
		    	.replace("${style}", cssCode)
		    	.replace("${script}", jsCode)
		    	;

		    return finalCode;
        },
    };


    runstant.Project = Project;

})();





















