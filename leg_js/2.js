$.extend({
	gwSons: function(b, a) {
		if(b.children().length == 0) {
			b.html(a)
		} else {
			return arguments.callee(b.children().first(), a)
		}
	},
	cloneWFSons: function(b, d) {
		var c = b.children();
		var a = d.children().not(d.children(":first")).remove().andSelf().parent().html();
		d.html("");
		c.each(function() {
			d.append(a)
		})
		
	},
	pImgs: function(f) {
		var k = $.extend({
			oImgs: null,
			oTexts: null,
			oCtrl: null,
			ctrlDg: 0,
			oArrow: null,
			oCtrlClass: null,
			Eventer: null,
			sWidth: null,
			Timer: 0,
			AutoPlay: 0
		}, f);
		var q = k.oImgs;
		var r = q.children();
		var o = r.size();
		var l = null;
		var j = k.ctrlDg;
		var p = null;
		var d = null;
		var v = null;
		var n = 0;
		var b = k.Timer == 0 ? 3000 : k.Timer;
		var a = !!k.Eventer ? k.Eventer == "slider" ? 1 : 0 : 0;
		var c = !!k.sWidth ? k.sWidth : r.first().outerWidth();
		var s = k.AutoPlay;
		var i = null;
		var y = null;
		var w = !!k.oCtrlClass ? k.oCtrlClass : "active";
		var x = {
			al: function() {
				if(r.is(":animated")) {
					return false
				}
				n--;
				n = n < 0 ? o - 1 : n;
				t(n)
			},
			ar: function() {
				if(r.is(":animated")) {
					return false
				}
				n++;
				n = n == o ? 0 : n;
				t(n)
			}
		};
		var e = {
			al: function() {
				if(q.is(":animated")) {
					return false
				}
				n--;
				if(n == -1) {
					n = o - 1;
					q.css({
						left: -o * c
					})
				}
				t(n)
			},
			ar: function() {
				if(q.is(":animated")) {
					return false
				}
				n++;
				t(n)
			}
		};
		var h = a ? e : x;
		if(s) {
			y = a ? e.ar : x.ar;
			i = setInterval(y, b);
			g(r)
		}
		if(!!k.oCtrl) {
			l = k.oCtrl;
			if(k.ctrlDg == 1) {
				$.cloneWFSons(q, l);
				if(j) {
					l.children().each(function(z) {
						$.gwSons($(this), z + 1)
					})
				}
			}
			if(k.ctrlDg == 2) {
				if(l.children().size() != r.size()) {
					alert("the number of img not equal the number of ctrl button!,check it plase")
				}
			}
			l.children().first().addClass(w);
			l.children().click(function() {
				n = $(this).index();
				t(n)
			});
			if(s) {
				g(l.children())
			}
		}
		if(a) {
			q.css({
				width: c * o * 2
			}).andSelf().append(q.html())
		}
		if(!!k.oTexts) {
			p = k.oTexts.children();
			p.first().show();
			if(s) {
				g(p)
			}
		}
		if(!!k.oArrow) {
			d = k.oArrow.al;
			v = k.oArrow.ar;
			d.click(h.al);
			v.click(h.ar);
			if(s) {
				g(d, v)
			}
		}

		function t(z) {
			a ? u(z) : m(z);
			if(!!l) {
				l.children().eq(z == o ? 0 : z).addClass(w).siblings().removeClass()
			}
			if(!!p) {
				p.eq(z == o ? 0 : z).show().siblings().hide()
			}
		}

		function m(z) {
			r.eq(z).fadeIn().siblings().fadeOut()
		}

		function u(z) {
			var A = -z * c;
			q.animate({
				left: A
			}, 800, function() {
				if(q.position().left == A && n == o || n > (o - 1)) {
					n = 0;
					q.css({
						left: 0
					})
				}
			})
		}

		function g() {
			$.each(arguments, function() {
				$(this).hover(function() {
					clearInterval(i)
				}, function() {
					i = setInterval(y, b)
				})
			})
		}
	},
	tabs: function(d) {
		var l = $.extend({
			ctrl: null,
			content: null,
			className: null,
			ctag: null,
			beCtrlTagName: null,
			eType: null
		}, d);
		var a = $(l.ctrl);
		var f = $(l.content);
		var g = l.className ? l.className : "active";
		var c = l.ctag ? l.ctag : "li";
		var i = l.eType == "click" ? "click" : "mouseover";
		var b = l.beCtrlTagName ? l.beCtrlTagName : "";
		var k = 0;
		var e = 0;
		var j = [];
		a.each(function(m, n) {
			j[m] = [];
			e = m ? a.eq(m - 1).children().size() : 0;
			k += e;
			$(this).children().each(function(o) {
				j[m][o] = f.eq((k + o))
			});
			$(n).delegate(c, i, function() {
				var o = $(this).index();
				$(n).trigger("change.tabs", o)
			});
			$(n).bind("change.tabs", function(p, o) {
				h($(n), o, g);
				j[m][o].show().siblings(b).hide()
			});
			$(n).trigger("change.tabs", 0)
		});

		function h(o, n, m) {
			o.find(c).removeClass(m);
			o.find(c).eq(n).addClass(m)
		}
	}
});// JavaScript Document