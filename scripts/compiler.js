
;(function() {

	rs.compiler = {

		jade2html: function(code) {
			var source = jade.compile(code, {
				pretty: true
			});
			return '<!-- Compiled Jade -->\n\n' + source();
		},

		markdown2html: function(code) {
			var source = markdown.toHTML(code);

			var unescapeHTML = function(html) {
				return html
					.replace(/&amp;/g, '&')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/&quot;/g, '"')
					.replace(/&#39;/g, "'")
					;
			};

			// html(scriptタグやstyleタグ)も書けるようにする
			var source = unescapeHTML(source);

			return '<!-- Compiled Markdown -->\n\n' + unescapeHTML(source);
		},

		coffee2js: function(code) {
			var source = CoffeeScript.compile(code);

			return '// Compiled CoffeeScript\n\n' + source;
		},

		es62js: function(code) {
		    var compiler = new traceur.Compiler({
		    	experimental: true,
		    });
		    var result = compiler.stringToString(code);
		    var code = result.js.match(/"use strict";([\s\S]*)return/m)[1];
		    console.log(code);

			return '// Compiled ECMAScript 6\n\n' + code;
		},

		ruby2js: function(code) {
			var result = Opal.compile(code);

			return '// Compiled opal\n\n' + result;
		},

		typescript2js: function(code) {
			var outfile = {
				source: '',
				Write: function(s) {
					this.source += s;
				},
				WriteLine: function(s) {
					this.source += s + '\n';
				},
				Close: function() {

				},
			};
			var outerror = {
				source: '',
				Write: function(s) { },
				WriteLine: function(s) { },
				Close: function() { },
			};

			var compiler = new TypeScript.TypeScriptCompiler(outfile, outerror);

			compiler.addUnit(code, '');
			compiler.emit(false, function createFile(fileName) {
			    return outfile;
			});

			return '// Compiled TypeScript\n\n' + outfile.source;
		},


		less2css: function(code) {
			// console.dir(less.Parser());
			var source = '';
			less.Parser().parse(code, function(err, tree) {
				if (err) {
					return console.error(err)
				}
				source = tree.toCSS();
			});

			return '/* Compiled LESS */\n\n' + source;
		},

		sass2css: function(code) {
			var css = Sass.compile(code);
			return '/* Compiled SASS */\n\n' + css;
		},

		stylus2css: function(code) {
			var source = '';
			var renderer = stylus(code);

			renderer.render(function(a, b) {
				source = b;
			});

			return '/* Compiled Stylus */\n\n' + source;
		},

		test: function() {
			// // test
			// var code = jade2html('html\n  head\n  body');
			// console.log(code);
			// // test
			// var code = coffee2js('console.log "coffee だよ!"');
			// console.log(code);
			// // test
			// var code = es62js('console.log("ECMAScript 6 だよ!")');
			// console.log(code);
			var code = ruby2js('puts "Hello, world!"');
			console.log(code);
			// // test
			// var code = less2css('body { #hoge { background: "red"; } }');
			// console.log(code);
			// test
			var code = stylus2css('body\n  background: "red"');
			console.log(code);
			// // test
			// var code = typescript2js('var isDone: boolean = false;');
			// console.log(code);
		},

	};

})();
