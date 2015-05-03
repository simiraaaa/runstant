runstant = runstant || {};

;(function() {


    var Setting = function(param) {
        this.init(param);
    };

    Setting.prototype = {
    	init: function(param) {
    		var self = this;

    		this.project = param.project;

    		var data = [
    			{
    				query: '#setting-project-title',
    				value: this.project.getTitle(),
    			},
    			{
    				query: '#setting-project-description',
    				value: this.project.getDescription(),
    			},
    			{
    				query: '#setting-project-html',
    				value: this.project.getCode('html').type,
    				type: 'select',
    			},
    			{
    				query: '#setting-project-style',
    				value: this.project.getCode('style').type,
    				type: 'select',
    			},
    			{
    				query: '#setting-project-script',
    				value: this.project.getCode('script').type,
    				type: 'select',
    			},
			];

    		data.forEach(function(d) {
    			var $elm = $(d.query);
	    		$elm.val( d.value );
	    		$elm.change(function() {
	    			self.fireChange(this);
	    		});

	    		if (d.type === 'select') {
	    			var option = $elm.find("option[value='{value}']".replace('{value}', d.value));
	    			option.selected = true;
	    			$elm.material_select();
	    		}
    		});


    		$('#modal-detail').openModal();
    	},

    	fireChange: function(elm) {
    		var elm = $(elm);

    		this.onchange({
    			id: elm.attr('id'),
    			value: elm.val(),
    		});
    	},

    	onchange: function() {

    	},
    };

    runstant.Setting = Setting;

})();