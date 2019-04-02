function generate(){var linkDL=document.getElementById("download"),btn=document.getElementById("btn"),direklink=document.getElementById("download").href,waktu=10;var teks_waktu=document.createElement("span");linkDL.parentNode.replaceChild(teks_waktu,linkDL);var id;id=setInterval(function(){waktu--;if(waktu<0){teks_waktu.parentNode.replaceChild(linkDL,teks_waktu);clearInterval(id);window.location.replace(direklink);linkDL.style.display="inline"}else{teks_waktu.innerHTML="<i class='fa fa-clock-o' aria-hidden='true'/> "+"Tệp đã sẵn sàng để tải xuống sau "+""+waktu.toString()+" Giây....";btn.style.display="none"}},1000)}
    var rdp_numposts = 7;
    var rdp_snippet_length = 150;
    var rdp_current = [];
    var rdp_total_posts = 0;
    var rdp_current = new Array(rdp_numposts);
    $(document).ready(function() {
      $.ajax({
        type: 'GET',
        url: '/feeds/posts/summary',
        data: {
          'max-results': 0,
          'alt': 'json'
        },
        dataType: 'jsonp',
        success: function(a) {
          var rdp_total_posts = a.feed.openSearch$totalResults.$t
          function get_random() {
            var a = 1 + Math.round(Math.random() * (rdp_total_posts - 1))
            return a
          }
          function getvalue() {
            for (var b = 0; b < rdp_numposts; b++) {
              var d = false;
              var c = get_random();
              for (var a = 0; a < rdp_current.length; a++) {
                if (rdp_current[a] == c) {
                  d = true;
                  break
                }
              }
              if (d) {
                b--
              } else {
                rdp_current[b] = c
              }
            }
          }
          getvalue()
          for (var i = 0; i < rdp_numposts; i++) $('#HTML3').append('<script src="/feeds/posts/summary?alt=json-in-script&start-index=' + rdp_current[i] + '&max-results=1&callback=random_posts"><\/script>')
        }
      })
    })
    $.ajaxPrefilter(function( options, original_Options, jqXHR ) {
        options.async = true;
    })
    function random_posts(t) {
      a = location.href, y = a.indexOf("?m=0");
      for (var e = 0; e < t.feed.entry.length; e++) {
        var s = t.feed.entry[e],
          r = s.title.$t;
        if ("content" in s) var n = s.content.$t;
        else n = "summary" in s ? s.summary.$t : "";
        if ((n = n.replace(/<[^>]*>/g, "")).length < rdp_snippet_length);
        else {
          var i = (n = n.substring(0, rdp_snippet_length)).lastIndexOf(" ");
          n.substring(0, i)
        }
        for (var l = 0; l < s.category.length; l++) var p = s.category[l].term,
          o = "/search/label/" + p;
     if (p == "blogspot") {
          p = p.replace("blogspot", "Blogspot");
        }
        if (p == "thu-thuat-facebook") {
          p = p.replace("thu-thuat-facebook", "Thủ Thuật Facebook");
        }
        if (p == "thu-thuat-blogspot") {
          p = p.replace("thu-thuat-blogspot", "Thủ Thuật Blogspot");
        }
        if (p == "blogger-template") {
          p = p.replace("blogger-template", "Blogger Template");
        }
        if (p == "facebook") {
          p = p.replace("facebook", "Facebook");
        }
        if (p == "psd-anh-bia") {
          p = p.replace("psd-anh-bia", "PSD Ảnh Bìa");
        }
        if (p == "phan-mem") {
          p = p.replace("phan-mem", "Phần Mềm");
        }
        if (p == "tan-man") {
          p = p.replace("tan-man", "Tản Mạn");
        }
        for (var d = 0; d < s.link.length; d++)
          if ("alternate" == s.link[d].rel) {
            var c = s.link[d].href; - 1 != y && (c += "?m=0");
            var f = s.published.$t;
            if ("media$thumbnail" in s) var m = s.media$thumbnail.url.replace("s72-c", "s320");
            else m = "https://4.bp.blogspot.com/-hkD0h1kIgiE/XD15yRS1KQI/AAAAAAAACjo/RNH9PE3WfeIPApQCS06RgMGx28EQPsVjQCLcBGAs/s300/no-images.png";
            var w200 = s.media$thumbnail.url.replace("s72-c", "w200-h112-p-k-no-nu"),
              w320 = s.media$thumbnail.url.replace("s72-c", "w320-h180-p-k-no-nu"),
              w400 = s.media$thumbnail.url.replace("s72-c", "w400-h225-p-k-no-nu"),
              w640 = s.media$thumbnail.url.replace("s72-c", "w640-h360-p-k-no-nu"),
              w1600 = s.media$thumbnail.url.replace("s72-c", "w1600-h900-p-k-no-nu"),
              u = f.substring(8, 10) + " thag " + f.substring(5, 7) + ", " + f.substring(0, 4);
          }
        $('#random-posts').append('<li><div class="post-thumb"><a href=' + c + ' title="' + r + '"><img alt="' + r + '" src=' + m + '  sizes="(min-width: 954px) 842px, (min-width: 801px) calc(100vw - 112px), calc(100vw - 64px)" srcset="' + w200 + " 200w, " + w320 + " 312w, " + w400 + " 400w, " + w640 + " 640w, " + w1600 + ' 1600w"/></a><span class="post-label"><a href="' + o + '" title="' + p + '">' + p + '</a></span></div><h2 class="post-title"><a href=' + c + ' title="' + r + '">' + r + '</a></h2><div class="post-meta"><span class="label"><a href="' + o + '" title="' + p + '">' + p + '</a></span><span class="post-date">' + u + '</span></div><p class="post-snippet">' + n + '</p></li>')
        $('.randomposts').removeClass('spinner').removeClass('load')
      }
    }
function toggleOverlay(){var e=document.getElementById(&quot;overlay&quot;),l=document.getElementById(&quot;jQsearchgiangv3&quot;);e.style.opacity=1,&quot;block&quot;==e.style.display?(e.style.display=&quot;none&quot;,l.style.display=&quot;none&quot;):(e.style.display=&quot;block&quot;,l.style.display=&quot;block&quot;,document.forms.jq_search_minhgiang_v3.elements.s.focus(500))}
