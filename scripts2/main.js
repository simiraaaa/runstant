/*
 * main.js
 */


$(document).ready(function() {

    $('select').material_select();
    $('.button-collapse').sideNav();
    $('.modal-trigger').leanModal();
    $('.tooltipped').tooltip({delay: 50});
    $('ul.tabs').tabs({
        select: function() {
            debugger;
        },
        beforeActivate: function( event, ui ) {
            debugger;
        },
    });

    // project
    var project = runstant.currentProject = new runstant.Project();
    // タブに反映
    $('ul.tabs').tabs('select_tab', 'editor-' + project.data.current);

    // preview
    var preview = jframe("#preview");

    // editor
    var editor = new runstant.Editor();
    var code = runstant.currentProject.data.code;

    editor.register('html', 'editor-html', code.html.type);
    editor.setValue('html', code.html.value);
    editor.register('style', 'editor-style', code.style.type);
    editor.setValue('style', code.style.value);
    editor.register('script', 'editor-script', code.script.type);
    editor.setValue('script', code.script.value);

    editor.onsave = function() {
        var current = $('ul.tabs').find("a.active").html();

        project.data.current = current;
        project.data.code[current].value = this.getValue(current);

        project.save();

        var code = project.toCode();
        preview.load(code);
        Materialize.toast('save & play', 1000, "rounded");
    };


    // setting
    var setting = new runstant.Setting({project:project});

    setting.onchange = function(e) {
        if (e.id === 'project-title') {
            project.setTitle(e.value);
        }
        else if (e.id === 'project-description') {
            project.setDescription(e.value);
        }
        else if (e.id === 'project-html') {
            this.project.getCode('html').type = e.value;
            editor.setMode('html', e.value);
        }
        else if (e.id === 'project-style') {
            this.project.getCode('style').type = e.value;
            editor.setMode('style', e.value);
        }
        else if (e.id === 'project-script') {
            this.project.getCode('script').type = e.value;
            editor.setMode('script', e.value);
        }

        project.save();
    };

    // var editor = ace.edit("editor-html");

    // var editor = ace.edit("editor-style");
    // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("ace/mode/javascript");

    // var editor = ace.edit("editor-script");
    // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("ace/mode/javascript");
    // editor.setValue(runstant.currentProject.data.code.script.value);

    // $("#play").click(function() {
    //     Materialize.toast('play', 1000, 'rounded')
    // });

    // // $('#modal-detail').openModal();

    // $("#theme").change(function() {
    //     var theme = $(this).val();

    //     editor.setTheme("ace/theme/" + theme);
    // });

    // $("#font-size").change(function() {
    //     var size = $(this).val();
    //     editor.setFontSize(+size);
    // });
});




