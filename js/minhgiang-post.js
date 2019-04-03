function generate(){var linkDL=document.getElementById("download"),btn=document.getElementById("btn"),direklink=document.getElementById("download").href,waktu=10;var teks_waktu=document.createElement("span");linkDL.parentNode.replaceChild(teks_waktu,linkDL);var id;id=setInterval(function(){waktu--;if(waktu<0){teks_waktu.parentNode.replaceChild(linkDL,teks_waktu);clearInterval(id);window.location.replace(direklink);linkDL.style.display="inline"}else{teks_waktu.innerHTML="<i class='fa fa-clock-o' aria-hidden='true'/> "+"Tệp đã sẵn sàng để tải xuống sau "+""+waktu.toString()+" Giây....";btn.style.display="none"}},1000)}
    $(document).ready(function() {
      $(".tr-caption-container,.tr-caption-container a,.separator a").css("margin-left", "").css("margin-right", ""), $(".tr-caption").css("text-align", ""), $(".post-body img").each(function() {
        var t = $(this),
          e = document.getElementsByClassName("post-title")[0].innerHTML;
        t.attr("title", e), t.attr("alt", e)
      })
      function copyTextToClipboard(e) {
        var t = document.createElement("textarea");
        t.style.position = "fixed", t.style.top = 0, t.style.left = 0, t.style.width = "2em", t.style.height = "2em", t.style.padding = 0, t.style.border = "none", t.style.outline = "none", t.style.boxShadow = "none", t.style.background = "transparent", t.value = e, document.body.appendChild(t), t.select();
        try {
          document.execCommand("copy")
        } catch (o) {
          alert("!!!")
        }
        document.body.removeChild(t)
      }
      $('.copy').click(function() {
        copyTextToClipboard(location.href)
        $('.modal-dialog,.dialog').removeClass('hidden')
        $('.dialog,.modal-dialog-buttons button').click(function() {
          $('.modal-dialog,.dialog').addClass('hidden')
        })
      })
      $('.drops').on('click', function() {
        $('.overlay-dialog').removeClass('hidden')
        $('html').click(function() {
          $('.overlay-dialog').addClass('hidden')
        })
      })
      $('.blog-cmt').click( function() { 
        $('#comments').removeClass('hidden')
        $('#fb-comments').addClass('hidden')
      })          
      $('.fb-cmt').click( function() {
        $('#fb-comments').removeClass('hidden')
        $('#comments').addClass('hidden') 
      })         
      var postEl = document.getElementsByClassName('social-wrapper');
      var postCount = postEl.length;
      for (i = 0; i < postCount; i++) {
        postEl[i].addEventListener("click", function(url, w, h) {
          var url = this.getAttribute("data-href"),
              dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
              dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top,
              h = 500,
              w = 500,
              width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
              height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
              left = ((width / 2) - (w / 2)) + dualScreenLeft,
              top = ((height / 2) - (h / 2)) + dualScreenTop;
          window.open(url, 'popUpWindow', 'height=' + h + ',width=' + w + ',left=' + left + ',top=' + top + ',resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
        })
      }
    })
var min=8;
var max=18;
function zoominLetter() {
var p = document.getElementsByTagName(‘p’);
for(i=0;i<p.length;i++) {
if(p[i].style.fontSize) {
var s = parseInt(p[i].style.fontSize.replace(“px”,””));
} else {
var s = 12;
}
if(s!=max) {
s += 1;
}
p[i].style.fontSize = s+”px”
}
}
function zoomoutLetter() {
var p = document.getElementsByTagName(‘p’);
for(i=0;i<p.length;i++) {
if(p[i].style.fontSize) {
var s = parseInt(p[i].style.fontSize.replace(“px”,””));
} else {
var s = 12;
}
if(s!=min) {
s -= 1;
}
p[i].style.fontSize = s+”px”
}
}
$(document).ready(function() {
$(“.tabs-menu a”).click(function(event) {
event.preventDefault();
$(this).parent().addClass(“current”);
$(this).parent().siblings().removeClass(“current”);
var tab = $(this).attr(“href”);
$(“.tab-content”).not(tab).css(“display”, “none”);
$(tab).fadeIn();
});
});
