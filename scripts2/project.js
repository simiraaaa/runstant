
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
                data = util.hash2json();
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

        getTitle: function() {
            return this.data.setting.title;
        },
        setTitle: function(v) {
            this.data.setting.title = v;
        },
    };


    runstant.Project = Project;

})();





















