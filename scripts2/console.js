
var runstant = runstant || {};

;(function() {

    var Console = function(param) {
        this.init(param);
    };

    Console.prototype = {
    	$console: null,
    	$input: null,
    	preview: null,
		stack: null,
		stackIndex: null,

		init: function(param) {
			this.$console = $(".console");
			this.$input = $("#console-input");
			this.preview = param.preview;
			this.stack = [];

			var self = this;
			var preview = this.preview;
			var stack = this.stack;

			var $input = this.$input;

		    $input.keypress(function(e) {
		        if (e.which === 13 && e.shiftKey === false) {
		            var v = $(this).text();
		            if (v === '') return false;

		            $(this).text('');
		            var frame = preview.domElement.querySelector('iframe');
		            var win = frame.contentWindow;

		            self.print(v, 'input');
		            win.postMessage(v, '*');
		            stack.push(v);

		            return false;
		        }
		    });
		    $input.keydown(function(e) {
		        if (e.which === 38) {
		            if (stack.length > 0) {
		                $(this).text(stack[stack.length-1]);
		                stack.pop();
		            }
		            else {
		                $(this).text('');
		            }
		        }
		    });

		    this.$console.click(function() {
		        $input.focus();
		        document.execCommand('selectAll',false,null);
		    });

		},
		run: function(v) {
			// TODO: 
			this.stackIndex = this.stack.length ;
		},
		print: function(str, cls) {
		    var $console = $('.content-console');
		    var $input = $('#console-input');
		    var $span = $('<span>');

		    $span.text(str);
		    $span.addClass(cls);
		    $input.before($span);
		    // $console.append($span);

		    setTimeout(function() {
		        $console[0].scrollTop = $console[0].scrollHeight;
		    });
		},
		clear: function() {
		    $('.content-console span').not(':last-child').remove();
		},
	};

    runstant.Console = Console;

})();
