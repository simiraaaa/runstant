/*
 * main.js
 */


$(document).ready(function() {

    $('select').material_select();
    $('.button-collapse').sideNav();
    $('.modal-trigger').leanModal();
    $('.tooltipped').tooltip({delay: 50});
    $('ul.tabs').tabs();

    // project
    var project = runstant.currentProject = new runstant.Project();
    // タイトルを反映
    $('#project-title').text(project.getTitle());
    // タブに反映
    $('ul.tabs').tabs('select_tab', 'editor-' + project.data.current);

    // user
    var user = new runstant.User();

    // preview
    var preview = jframe("#preview");

    // editor
    var editor = new runstant.Editor();
    var code = runstant.currentProject.data.code;
    // type and data
    editor.register('html', 'editor-html', code.html.type);
    editor.setValue('html', code.html.value);
    editor.register('style', 'editor-style', code.style.type);
    editor.setValue('style', code.style.value);
    editor.register('script', 'editor-script', code.script.type);
    editor.setValue('script', code.script.value);
    // theme
    editor.setTheme(user.data.theme);
    // fontSize
    editor.setFontSize(user.data.fontSize);

    editor.onsave = function() {
        var current = $('ul.tabs').find("a.active").data('type');

        project.data.current = current;
        project.data.code['html'].value = this.getValue('html');
        project.data.code['style'].value = this.getValue('style');
        project.data.code['script'].value = this.getValue('script');

        project.save();

        var code = project.toCode();
        preview.load(code);
        Materialize.toast('save & play', 1000, "rounded");
    };


    // setting
    var setting = new runstant.Setting({
        project:project,
        user:user,
    });

    setting.onchange = function(e) {
        if (e.id === 'setting-project-title') {
            $('#project-title').text(e.value);
            project.setTitle(e.value);
        }
        else if (e.id === 'setting-project-description') {
            project.setDescription(e.value);
        }
        else if (e.id === 'setting-project-html') {
            this.project.getCode('html').type = e.value;
            editor.setMode('html', e.value);
        }
        else if (e.id === 'setting-project-style') {
            this.project.getCode('style').type = e.value;
            editor.setMode('style', e.value);
        }
        else if (e.id === 'setting-project-script') {
            this.project.getCode('script').type = e.value;
            editor.setMode('script', e.value);
        }
        else if (e.id === 'setting-user-name') {
            user.data.username = e.value;
            user.save();
        }
        else if (e.id === 'setting-user-theme') {
            user.data.theme = e.value;
            user.save();
            editor.setTheme(user.data.theme);
        }
        else if (e.id === 'setting-user-font-size') {
            user.data.fontSize = e.value;
            user.save();
            editor.setFontSize(user.data.fontSize);
        }

        loadScripts();
        project.save();
    };

    var fullscreen = function() {
        if (project.data.fullscreen) {
            var className = project.data.fullscreen;
            var $target = $('.' + className);

            $target.addClass('fullscreen');

            var $icon = $target.find('.btn-fullscreen i');
            $icon.removeClass("mdi-navigation-fullscreen");
            $icon.addClass("mdi-navigation-fullscreen-exit");
        }
        else {
            var $target = $('.fullscreen');

            $target.removeClass('fullscreen');
            var $icon = $target.find('.btn-fullscreen i');
            $icon.addClass("mdi-navigation-fullscreen");
            $icon.removeClass("mdi-navigation-fullscreen-exit");
        }

        // タブを元に戻す
        setTimeout(function() {
            $('ul.tabs').tabs('select_tab', $('ul.tabs').find(".active").attr('href').substr(1));
        }, 500);
    };

    fullscreen();

    // fullscreen
    $(".btn-fullscreen").click(function() {
        var $this = $(this);
        var type = $this.data('type');

        if (project.data.fullscreen === type) {
            project.data.fullscreen = null;
        }
        else {
            project.data.fullscreen = type;
        }

        project.save();
        fullscreen();

        return false;
    });

    // 関連スクリプトをロードする
    loadScripts(function() {
        var code = project.toCode();
        preview.load(code);
        Materialize.toast('save & play', 1000, "rounded");
    });

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



var loadScripts = function(callback) {
    var code = runstant.currentProject.data.code;

    var types = [
        code.html.type,
        code.style.type,
        code.script.type,
    ];

    var count = 0;
    var counter = 0;

    types.forEach(function(value) {
        var path = constant.LANG_SCRIPT_MAP[value];
        if (path) {
            count++;
            util.loadScript(path, function() {
                counter++;

                if (counter >= count) {
                    callback && callback();
                }
            });
        }
    });

    if (count == 0) {
        callback && callback();
    }
};