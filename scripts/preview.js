

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
			this.printConsole(str, 'log');
		},

		dir: function(obj) {
			var str = JSON.stringify(obj, '', '  ');
			this.printConsole(str, 'dir');
		},

		error: function(obj) {
			var str = obj.join(' ');
			this.printConsole(str, 'error');
		},

		printConsole: function(str, c) {
			var consoleElement = document.querySelector("#console");
			var span = document.createElement("span");
			span.textContent = str;
			span.classList.add(c);

			consoleElement.appendChild(span);

			setTimeout(function() {
				consoleElement.scrollTop = consoleElement.scrollHeight;
			}, 100);
		},
	};

})();