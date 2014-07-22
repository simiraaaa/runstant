

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
		},
	};

})();