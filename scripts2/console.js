
var runstant = runstant || {};

;(function() {

	var Console = {
		run: function() {
			
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
