

;(function() {

	rs.Preview = function(param) {
		this.domElement = document.querySelector(param.query);
	};

	rs.Preview.prototype = {
		run: function(code) {
		    var iframe = document.createElement("iframe");

		    this.domElement.innerHTML = "";
		    this.domElement.appendChild(iframe);

		    var idoc = iframe.contentDocument;

		    idoc.open();
		    idoc.write(code);
		    idoc.close();

		    // console.log(code);

		    var pre = document.createElement("pre");
		    this.domElement.appendChild(pre);
		    pre.id = "console";
		},

		log: function() {
			var str = Array.prototype.join.call(arguments, ' ');
			this.printConsole(str);
		},

		dir: function(obj) {
			var str = JSON.stringify(obj, '', '  ');
			this.printConsole(str);
		},

		printConsole: function(str) {
			var consoleElement = document.querySelector("#console");
			var span = '<span>' + str + '</span>';

			consoleElement.innerHTML += span;

			setTimeout(function() {
				consoleElement.scrollTop = consoleElement.scrollHeight;
			}, 100);
		},
	};

})();