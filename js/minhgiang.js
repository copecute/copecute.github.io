function generate(){var linkDL=document.getElementById("download"),btn=document.getElementById("btn"),direklink=document.getElementById("download").href,waktu=10;var teks_waktu=document.createElement("span");linkDL.parentNode.replaceChild(teks_waktu,linkDL);var id;id=setInterval(function(){waktu--;if(waktu<0){teks_waktu.parentNode.replaceChild(linkDL,teks_waktu);clearInterval(id);window.location.replace(direklink);linkDL.style.display="inline"}else{teks_waktu.innerHTML="<i class='fa fa-clock-o' aria-hidden='true'/> "+"Tệp đã sẵn sàng để tải xuống sau "+""+waktu.toString()+" Giây....";btn.style.display="none"}},1000)}
    var cookie = &quot;<data:messages.euCookieNotice/>&quot;;
    $(document).ready(function() {
      $('body').append($('<div><dt/><dd/></div>').attr('id', 'progress'))
      $('#progress').width(100 + '%')
      $('#progress').width('101%').delay(800).fadeOut(400, function() {
        $(this).remove()
      })
      $(".apps").each(function() {
        var d = $(this);
        $(".drop", d).click(function(n) {
          return n.preventDefault(), $div = $(".gb_fa", d), $div.toggle(), $(".gb_fa").not($div).hide(), !1
        })
      }), $("html,.drops,.dropsss,.dropss,.tt_tg,.dropdown-link,.dropdwn,.Label button,.bg_Se input").click(function() {
        $(".gb_fa").hide()
      }), $(".au").each(function() {
        var d = $(this);
        $(".dropss", d).click(function(n) {
          return n.preventDefault(), $div = $(".au-menu", d), $div.toggle(), $(".au-menu").not($div).hide(), !1
        })
      }), $("html,.drop,.drops,.dropsss,.tt_tg,.dropdown-link,.dropdwn,.Label button,.bg_Se input").click(function() {
        $(".au-menu").hide()
      }), $(".tb").each(function() {
        var d = $(this);
        $(".dropsss", d).click(function(n) {
          return n.preventDefault(), $div = $(".tb-menu", d), $div.toggle(), $(".tb-menu").not($div).hide(), !1
        })
        $('.tb-menu,.au-menu').click(function(e) {
          e.stopPropagation()
        })
      }), $("html,.drop,.drops,.dropss,.tt_tg,.dropdown-link,.dropdwn,.Label button,.bg_Se input").click(function() {
        $(".tb-menu").hide()
        $('.recent-comments ul').empty()
        $('#numcomments').attr('value', '0')
        $('#allcomments').attr('value', '')
        $('.loading').removeClass('spinner').removeClass('load')
      }), $("html").click(function() {
        $(".tg-menu").hide()
      }), $(".tg").each(function() {
        var d = $(this);
        $(".tt_tg", d).click(function(n) {
          return n.preventDefault(), $div = $(".tg-menu", d), $div.toggle(), $(".tg-menu").not($div).hide(), !1
        })
      }), $("html,.drop,.drops,.dropss,.dropsss,.dropdown-link,.dropdwn,.Label button,.bg_Se input").click(function() {
        $(".tg-menu").hide()
      }), $(".dropdown").each(function() {
        var d = $(this);
        $(".dropdown-link", d).click(function(n) {
          return n.preventDefault(), $div = $(".dropdown-container", d), $div.toggle(), $(".dropdown-container").not($div).hide(), !1
        })
      }), $("html,.drop,.drops,.dropss,.dropsss,.tt_tg,.dropdwn,.Label button,.bg_Se input").click(function() {
        $(".dropdown-container").hide()
      }), $(".dd").each(function() {
        var d = $(this);
        $(".drops", d).click(function(n) {
          return n.preventDefault(), $div = $(".dd-menu", d), $div.toggle(), $(".dd-menu").not($div).hide(), !1
        })
      }), $("html,.drop,.dropss,.dropsss,.tt_tg,.dropdown-link,.dropdwn,.Label button,.bg_Se input").click(function() {
        $(".dd-menu").hide()
      }), $(".dds").each(function() {
        var d = $(this);
        $(".dropdwn", d).click(function(n) {
          return n.preventDefault(), $div = $(".dds-menu", d), $div.toggle(), $(".dds-menu").not($div).hide(), !1
        })
      }), $("html,.drop,.drops,.dropss,.dropsss,.tt_tg,.dropdown-link,.Label button,.bg_Se input").click(function() {
        $(".dds-menu").hide()
      })
      $('.bg_Se input').click(function(e) {
        e.stopPropagation()
        $('.gb_Se').addClass('gb_af')
      })
      $('html,.drop,.drops,.dropss,.dropsss,.tt_tg,.dropdown-link,.dropdwn,.Label button').click(function() {
        $('.gb_Se').removeClass('gb_af')
      })

window.onscroll = function() {myFunction()};
var navbar = document.getElementById("res_menu_giang");
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("fixed")
  } else {
    navbar.classList.remove("fixed");
}}
      $('.bg_Se input').on('keyup', function(e) {
        var textinput = $(this).val()
        if (textinput) {
          $.ajax({
            type: 'GET',
            url: '/feeds/posts/summary',
            data: {
              'max-results': 10,
              'alt': 'json',
              'q': textinput
            },
            dataType: 'jsonp',
            success: function(data) {
              $('.results,.clear-text').removeClass('hidden')
              $('.results').empty()
              if (data.feed.entry) {
                for (var i = 0; i < data.feed.entry.length; i++) {
                  for (var j = 0; j < data.feed.entry[i].link.length; j++) {
                    if (data.feed.entry[i].link[j].rel == 'alternate') {
                      var postUrl = data.feed.entry[i].link[j].href;
                      break;
                    }
                  }
                  var postTitle = data.feed.entry[i].title.$t
                  $('.results').append('<li><a href=' + postUrl + ' title="' + postTitle + '">' + '<svg viewBox="0 0 48 48"><path d="M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-3.98 12H14v-4h20.02v4zm0 8H14v-4h20.02v4zm-6 8H14v-4h14.02v4z"></path></svg>' + postTitle + '</a></li>')
                }
              } else {
                $('.results').addClass('hidden')
              }
            }
          })
        } else {
          $('.results,.clear-text').addClass('hidden')
        }
      })
      $('.clear-text').click(function() {
        $('.bg_Se input').val('')
        $('.results,.clear-text').addClass('hidden')
        $('.results').empty()
      })
      $.ajax({
        url: "/feeds/posts/summary",
        type: "get",
        data: {
          'max-results': 0,
          'alt': 'json'
        },
        dataType: "jsonp",
        success: function(e) {
          var totalItems = e.feed.openSearch$totalResults.$t;
          $('.total_posts').html(totalItems);
        }
      })
    })
      $(function() {
        $.fn.scrollToTop = function() {
          $(this).hide().removeAttr("href"), "0" != $(window).scrollTop() && $(this).fadeIn("slow")
          var o = $(this);
          $(window).scroll(function() {
            "0" == $(window).scrollTop() ? $(o).fadeOut("slow") : $(o).fadeIn("slow")
          }), $(this).click(function() {
            $("html, body").animate({
              scrollTop: 0
            }, "slow")
          })
        }
        $(".MD-StoTop").scrollToTop()
      })
    function setCookie(cookie_name, value) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + (365 * 25))
      document.cookie = cookie_name + "=" + escape(value) + "; expires=" + exdate.toGMTString() + "; path=/"
    }
    function getCookie(cookie_name) {
      if (document.cookie.length > 0) {
        cookie_start = document.cookie.indexOf(cookie_name + "=")
        if (cookie_start != -1) {
          cookie_start = cookie_start + cookie_name.length + 1;
          cookie_end = document.cookie.indexOf(";", cookie_start)
          if (cookie_end == -1) {
            cookie_end = document.cookie.length
          }
          return unescape(document.cookie.substring(cookie_start, cookie_end))
        }
      }
      return ""
    }
    $(function() {
      if (getCookie('cookie_message') != 'no') {
        $('body').append('<div class="dialog-cookie"><div class="dialog-cookie-content">' + cookie + '<svg class="dialog-cookie-close"><use xlink:href="/responsive/sprite_v1_6.css.svg#ic_close_black_24dp" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></div></div>')
      }
      $('.dialog-cookie-close').click(function() {
        $('.dialog-cookie').hide()
        setCookie('cookie_message', 'no')
        return false
      })
    })
    $('.tb button.dropsss').on('click', function() {
      if ($('.tb-menu').css('display') === 'none') {
        $('.recent-comments').addClass('spinner')
        var numcomments = 10;
        $.ajax({
          type: 'GET',
          url: '/feeds/comments/summary',
          data: {
            'max-results': numcomments,
            'alt': 'json'
          },
          dataType: 'jsonp',
          jsonp: 'callback',
          jsonpCallback: 'getComments',
          success: function(e) {
            $('.recent-comments').removeClass('spinner')
            var totalcomments = e.feed.openSearch$totalResults.$t
            $('#allcomments').attr('value', totalcomments)
            scroll = 1
            $('.recent-comments').scroll(function() {
              var a = $('.recent-comments').scrollTop(),
                b = parseInt($('.comments').height() - $('.recent-comments').height())
              if (a >= b) {
                if (scroll == 1) {
                  scroll = 0
                  $('.loading').addClass('spinner').addClass('load')
                  var items = Number($('#numcomments').val())
                  items = items + numcomments
                  if (items <= totalcomments) {
                    setTimeout(function() {
                      $('#numcomments').val(items)
                      $.ajax({
                        type: 'GET',
                        url: '/feeds/comments/summary',
                        data: {
                          'max-results': numcomments,
                          'start-index': items + 1,
                          'alt': 'json'
                        },
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        jsonpCallback: 'getComments',
                        success: function() {
                          scroll = 1
                          var lastcomments = items + numcomments;
                          if (lastcomments > totalcomments) {
                            $('.loading').removeClass('spinner').removeClass('load')
                          }
                        }
                      })
                    }, 1000)
                  } else {
                    $('.loading').removeClass('spinner').removeClass('load')
                  }
                }
              }
            })
          }
        })
      } else {
        $('.recent-comments ul').empty()
        $('#numcomments').attr('value', '0')
        $('#allcomments').attr('value', '')
        $('.loading').removeClass('spinner').removeClass('load')
      }
    })
    function getComments(e) {
      if (e.feed.entry) {
        for (var t = 0; t < e.feed.entry.length; t++) {
          for (var r = 0; r < e.feed.entry[t].link.length; r++)
            if ("alternate" == e.feed.entry[t].link[r].rel) {
              var a = e.feed.entry[t].link[r].href;
              break
            }
          var n = e.feed.entry[t].published.$t,
            l = e.feed.entry[t].author[0].gd$image.src.replace("https://img1.blogblog.com/img/b16-rounded.gif", "https://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s40"),
            s = n.substring(8, 10) + " thag " + n.substring(5, 7) + ", " + n.substring(0, 4),
            i = e.feed.entry[t].author[0].uri.$t,
            c = (e.feed.entry[t].title.$t, e.feed.entry[t].author[0].name.$t),
            o = e.feed.entry[t].summary.$t.substring(0, 150);
          function formatUrl(o) {
            if (o) {
              o = o.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(url) {
                var full_url = url;
                if (!full_url.match('^https?:\/\/')) {
                  full_url = 'http://' + full_url;
                }
                return '<a href="' + full_url + '">' + url + '</a>';
              });
            }
            return o;
          }
          $(".recent-comments ul").append('<li><div class="rc_avatar"><img src=' + l + ' alt="' + c + '" /></div><div class="rc_block"><div class="rc_header"><span class="rc_user"><a rel="nofollow" href=' + i + ' title="' + c + '" target="_blank">' + c + '</a></span><span class="rc_date"><a rel="nofollow" href=' + a + '>' + s + '</a></span></div><p class="rc_content">' + formatUrl(o) + "</p></div></li>")
        }
      }
      replaceText()
    }
