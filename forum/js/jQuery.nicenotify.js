(function() {
  "use strict";
  var $, Animation, HP,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  Animation = (function() {
    function Animation() {}

    Animation.transitions = {
      "webkitTransition": "webkitTransitionEnd",
      "mozTransition": "mozTransitionEnd",
      "oTransition": "oTransitionEnd",
      "transition": "transitionend"
    };

    Animation.transition = function($el) {
      var el, ref, result, type;
      el = $el[0];
      ref = this.transitions;
      for (type in ref) {
        result = ref[type];
        if (el.style[type] != null) {
          return result;
        }
      }
    };

    return Animation;

  })();

  HP = (function() {
    HP.settings = {
      namespace: 'HP',
      duration: 3200,
      close: "&#215;",
      location: "default",
      style: "default",
      size: "medium"
    };

    HP.HP = function(settings) {
      if (settings == null) {
        settings = {};
      }
      this.initialize();
      return new HP(settings);
    };

    HP.initialize = function() {
      return $("body:not(:has(#HPs))").append('<div id="HPs" />');
    };

    function HP(settings) {
      if (settings == null) {
        settings = {};
      }
      this.container = bind(this.container, this);
      this.content = bind(this.content, this);
      this.html = bind(this.html, this);
      this.$HP = bind(this.$HP, this);
      this.$HPs = bind(this.$HPs, this);
      this.animate = bind(this.animate, this);
      this.remove = bind(this.remove, this);
      this.dismiss = bind(this.dismiss, this);
      this.present = bind(this.present, this);
      this.cycle = bind(this.cycle, this);
      this.close = bind(this.close, this);
      this.click = bind(this.click, this);
      this.unbind = bind(this.unbind, this);
      this.bind = bind(this.bind, this);
      this.render = bind(this.render, this);
      this.settings = $.extend({}, HP.settings, settings);
      this.$HPs().attr('class', this.settings.location);
      this.render();
    }

    HP.prototype.render = function() {
      var $HP;
      $HP = this.$HP();
      this.$HPs().append($HP);
      if (this.settings.fixed) {
        this.present();
      } else {
        this.cycle();
      }
    };

    HP.prototype.bind = function($HP) {
      if ($HP == null) {
        $HP = this.$HP();
      }
      $HP.on("click", this.click);
      return $HP.on("contextmenu", this.close).find("." + this.settings.namespace + "-close").on("click", this.close);
    };

    HP.prototype.unbind = function($HP) {
      if ($HP == null) {
        $HP = this.$HP();
      }
      $HP.off("click", this.click);
      return $HP.off("contextmenu", this.close).find("." + this.settings.namespace + "-close").off("click", this.close);
    };

    HP.prototype.click = function(event) {
      if (this.settings.url != null) {
        event.preventDefault();
        event.stopPropagation();
        return window.open(this.settings.url);
      }
    };

    HP.prototype.close = function(event) {
      var $HP;
      event.preventDefault();
      event.stopPropagation();
      $HP = this.$HP();
      return $HP.stop().queue(this.dismiss).queue(this.remove);
    };

    HP.prototype.cycle = function() {
      var $HP;
      $HP = this.$HP();
      return $HP.queue(this.present).delay(this.settings.duration).queue(this.dismiss).queue(this.remove);
    };

    HP.prototype.present = function(callback) {
      var $HP;
      $HP = this.$HP();
      this.bind($HP);
      return this.animate($HP, this.settings.namespace + "-incoming", 'out', callback);
    };

    HP.prototype.dismiss = function(callback) {
      var $HP;
      $HP = this.$HP();
      this.unbind($HP);
      return this.animate($HP, this.settings.namespace + "-outgoing", 'in', callback);
    };

    HP.prototype.remove = function(callback) {
      this.$HP().remove();
      return callback();
    };

    HP.prototype.animate = function($element, name, direction, callback) {
      var transition;
      if (direction == null) {
        direction = 'in';
      }
      transition = Animation.transition($element);
      $element[direction === 'in' ? 'removeClass' : 'addClass'](name);
      $element.offset().position;
      $element[direction === 'in' ? 'addClass' : 'removeClass'](name);
      if (callback == null) {
        return;
      }
      if (transition != null) {
        $element.one(transition, callback);
      } else {
        callback();
      }
    };

    HP.prototype.$HPs = function() {
      return this.$_HPs != null ? this.$_HPs : this.$_HPs = $('#HPs');
    };

    HP.prototype.$HP = function() {
      return this.$_HP != null ? this.$_HP : this.$_HP = $(this.html());
    };

    HP.prototype.html = function() {
      return this.container(this.content());
    };

    HP.prototype.content = function() {
      return "<div class='" + this.settings.namespace + "-close'>" + this.settings.close + "</div>\n<div class='" + this.settings.namespace + "-title'>" + this.settings.title + "</div>\n<div class='" + this.settings.namespace + "-message'>" + this.settings.message + "</div>";
    };

    HP.prototype.container = function(content) {
      return "<div class='" + this.settings.namespace + " " + this.settings.namespace + "-" + this.settings.style + " " + this.settings.namespace + "-" + this.settings.size + "'>\n  " + content + "\n</div>";
    };

    return HP;

  })();

  this.HP = HP;

  $.HP = function(options) {
    if (options == null) {
      options = {};
    }
    return HP.HP(options);
  };

  $.HP.error = function(options) {
    var settings;
    if (options == null) {
      options = {};
    }
    settings = {
      title: "Error!",
      style: "error"
    };
    return $.HP($.extend(settings, options));
  };

  $.HP.notice = function(options) {
    var settings;
    if (options == null) {
      options = {};
    }
    settings = {
      title: "Notice!",
      style: "notice"
    };
    return $.HP($.extend(settings, options));
  };

  $.HP.warning = function(options) {
    var settings;
    if (options == null) {
      options = {};
    }
    settings = {
      title: "Warning!",
      style: "warning"
    };
    return $.HP($.extend(settings, options));
  };

}).call(this);
