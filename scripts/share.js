;(function() {

    rs.share = {
        twitter: function(param) {
            var url = "https://twitter.com/intent/tweet?text={text}&hashtags=runstant&via={via}&url={url}";
            url = url.replace("{text}", encodeURIComponent(param.text));
            url = url.replace("{via}", "runstant");
            url = url.replace("{url}", encodeURIComponent(param.url));
            window.open(url, 'share', 'width=640, height=480');
        },
        facebook: function(param) {
            var url = "https://www.facebook.com/sharer/sharer.php?u={url}";
            url = url.replace("{url}", encodeURIComponent(param.url));
            window.open(url, 'share', 'width=640, height=480');
        },
        google: function(param) {
            var url = "https://plus.google.com/share?url={url}";
            url = url.replace("{url}", encodeURIComponent(param.url));
            window.open(url, 'share', 'width=640, height=480');
        },
        pocket: function(param) {
            var url = "https://getpocket.com/edit?url={url}";
            url = url.replace("{url}", encodeURIComponent(param.url));
            window.open(url, 'share', 'width=640, height=480');
        },
        hatebu: function(param) {
        	var url = "http://b.hatena.ne.jp/entry/{url}";
            url = url.replace("{url}", encodeURIComponent(param.url));
            window.open(url, 'share');
        },
        fullscreen: function(param) {
            var html = data.html;
            html = html.replace("{script}", data.js);
            html = html.replace("{style}", data.css);

            window.open("data:text/html;base64," + window.btoa( unescape(encodeURIComponent( html )) ));
        },
    };

})();

