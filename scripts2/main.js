/*
 * main.js
 */


$(document).ready(function() {

    $('select').material_select();
    $('.button-collapse').sideNav();
    $('.modal-trigger').leanModal();
    $('.tooltipped').tooltip({delay: 50});
    $('ul.tabs').tabs();

    runstant.currentProject = new runstant.Project();

    var editor = new runstant.Editor();

    var code = runstant.currentProject.data.code;

    editor.register('html', 'editor-html', code.html.type);
    editor.setValue('html', code.html.value);
    editor.register('style', 'editor-style', code.style.type);
    editor.setValue('style', code.style.value);
    editor.register('script', 'editor-script', code.script.type);
    editor.setValue('script', code.script.value);


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




