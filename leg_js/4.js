$(function() {
	//新页面跳转
	$("a").attr("target", "_blank");
	$(".logo").attr("target", "_self");
        $(".home").attr("target", "_self");
	//多少时间前函数
	function timeAgo(publishtime) {
		var d_minutes, d_hours, d_days;
		var timeNow = parseInt(new Date().getTime() / 1000);
		var d;
		d = timeNow - publishtime;
		d_days = parseInt(d / 86400);
		d_hours = parseInt(d / 3600);
		d_minutes = parseInt(d / 60);
		if(d_days > 0 && d_days < 4) {
			return d_days + "天前";
		} else if(d_days <= 0 && d_hours > 0) {
			return d_hours + "小时前";
		} else if(d_hours <= 0 && d_minutes > 0) {
			return d_minutes + "分钟前";
		} else {
			var s = new Date(publishtime * 1000);
			return(s.getMonth() + 1) + "月" + s.getDate() + "日";
		}
	};
	var obj = $(".timeago");
	var len = $(obj).length;
	for(var i = 0; i < len; i++) {
		var pTime = $(obj[i]).attr("publishtime");
		var pubTime = parseInt(Date.parse(pTime) / 1000);
		$(obj[i]).html(timeAgo(pubTime));
	}
	//点击加载更多
	$(".click_more").click(function() {
		Nextpage();
	});
	href = window.location.href;
	if(href.indexOf('notebook') > 0) {
		var channel = 'notebook';
		var template = 323
	}

	function Nextpage() {
		var name = $(".rec_con .nav_show .rlist_title").attr("name");
		var num = parseInt($(".rec_con .nav_show .rlist_title").attr("num"));
		$(".rec_con .nav_show .rlist_title").attr("num", num);
		var url = "http://" + channel + ".yesky.com/more/" + template + "_94415_" + name + num + ".xml";
console.log(url);
		var _html = "";
		num += 1;
		$(".rec_con .nav_show .rlist_title").attr("num", num)
		$.ajax({
			type: "get",
			dataType: "text",
			url: url,
			success: function(data) {
				data = JSON.stringify(data);
				data = data.replace(/\\r\\n/g, "");
				data = eval('(' + data + ')');
				var data = JSON.parse(data);
				for(i = 0; i < data.articles.length; i++) {
					var Time = data.articles[i].publishDate.replace(/-/g, "/");
					_html += '<dl class="list"><dt><a href="' + data.articles[i].url + '"><img src="' + data.articles[i].articleimage_big + '"></a></dt>' +
						'<dd><h3><a href="">' + data.articles[i].titleName + '</a></h3>' +
						'<p>' + data.articles[i].artiledigest + '</p><div class="infor"><span class="author"><i></i>' + data.articles[i].author + '</span>' +
						'<span class="time"><i></i><div class="timeago" publishtime="' + Time + '"></div></span></div></dd></dl>';
				}
				$(".rec_con .nav_show .click_more").before(_html);
				//多少时间前
				var obj = $(".timeago");
				var len = $(obj).length;
				for(var i = 0; i < len; i++) {
					var pTime = $(obj[i]).attr("publishtime");
					var pubTime = parseInt(Date.parse(pTime) / 1000);
					$(obj[i]).html(timeAgo(pubTime));
				}
			},
			error: function() {
				console.log('error');
			}
		});
	}
	//分类导航均分
	average();

	function average() {
		var num = $(".rlcon").index();
		var w = 100 / (num + 1) + "%";
		$(".rlcon").css("width", w);
	}
	$(".topleft li").hover(function() {
		$(this).find("p").show();
		$(this).find("span").addClass("show");
	}, function() {
		$(this).find("p").hide();
		$(this).find("span").removeClass("show");
	});
	$(".log").hover(function() {
		$("#userLogin").show();
		$(this).find("a").addClass("show");
	}, function() {
		$("#userLogin").hide();
		$(this).find("a").removeClass("show");
	});
	$("#selectClass").hover(function() {
		$(this).find("ul").show();
	}, function() {
		$(this).find("ul").hide();
	});
	$("#selectClass ul li").click(function() {
		var html = $(this).html();
		var qb = $(this).attr("qb");
		$("#selectClass span").html(html);
		$("#selectClass span").attr("qb", qb);
		$("#selectClass ul").hide();
	});
	$(".nav2 dl").hover(function() {
		$(this).find("dt").addClass("nav_show");
		$(this).siblings("dl").find("dt").removeClass("nav_show");
		$(this).find("dd").show();
		$(this).siblings("dl").find("dd").hide();
	});
	$(".rlcon").hover(function() {
		$(this).addClass("nav_show");
		$(this).siblings(".rlcon").removeClass("nav_show");
		$(this).find(".rlist_con").show();
		$(this).siblings(".rlcon").find(".rlist_con").hide();
	});
	$(".rlist_title").mouseover(function() {
		if($(".rlist_title").hasClass("fixed_top")) {
			var mTop = $(".left_con")[0].offsetTop - 15;
			$(window).scrollTop(mTop);
			$(".rlist_title").removeClass("fixed_top");
		};
	});
	$("#pr_left").click(function() {
		$(this).addClass("show");
		$("#pr_right").removeClass("show");
		$(".pr_left").show();
		$(".pr_right").hide();
	});
	$("#pr_right").click(function() {
		$(this).addClass("show");
		$("#pr_left").removeClass("show");
		$(".pr_right").show();
		$(".pr_left").hide();
	});
	$(".pr_left li").hover(function() {
		$(this).find(".fir_con").css("display", "block");
		$(this).siblings("li").find(".fir_con").hide();
	});
	$(".pr_right li").hover(function() {
		$(this).find(".fir_con").css("display", "block");
		$(this).siblings("li").find(".fir_con").hide();
	});
	$(".net_rec li").hover(function() {
		$(this).find(".fir_con").css("display", "block");
		$(this).siblings("li").find(".fir_con").hide();
	});
	$(".group_nav li").mousemove(function(){
		$(".group_nav .home").removeClass("home");
	});
	$(".rlist_con .list").eq(3).css("border-bottom", "none")
	//导航置顶
	window.onscroll = function() {
		var mTop = $(".left_con")[0].offsetTop;
		var sTop = $(window).scrollTop() - 15;
		var top = mTop - sTop;
		if(top <= 0) {
			$(".rlist_title").addClass("fixed_top");
		} else {
			$(".rlist_title").removeClass("fixed_top");
		}
	};
	//换一换
	var i = 4;
	var length = $(".rlc li").length;
	$(".rlc li:gt(3)").hide();
	$(".change").click(function() {
		$(".rlc li:lt(" + i + ")").hide();
		$(".rlc li:gt(" + (i - 1) + ")").show();
		i += 4;
		$(".rlc li:gt(" + (i - 1) + ")").hide();
		if(i >= length - 4) {
			i = 4;
		}
	});
	bro();
})

//轮播图
$(function() {
	picfun(".banner_img", ".banner_circle", "active", 600);

	function picfun(picbox, circ, acting, width) {
		$.pImgs({
			oImgs: $(picbox),
			oCtrl: $(circ),
			oCtrlClass: acting,
			Eventer: "slider",
			sWidth: width,
			Timer: 2000,
			AutoPlay: 1
		})
	};
	picfun(".v_img", ".v_circle", "v_active", 366);

	function picfun(picbox, circ, acting, width) {
		$.pImgs({
			oImgs: $(picbox),
			oCtrl: $(circ),
			oCtrlClass: acting,
			Eventer: "slider",
			sWidth: width,
			Timer: 2000,
			AutoPlay: 1
		})
	}
});

//搜索
$(function() {
	iSearch("#selectClass", "#selectform");
});

function iSearch(id, form) {
	//按类型提交判断
	$(form).submit(function() {
		var oWd = $(this).find(".seltext").val();
		var oType = $(id + ' span').attr('qb');
		var ozhi = $(".seltext").val();
		if(oType == "wy") {
			document.getElementById('selectform').setAttribute("action", "http://search.yesky.com/search.do?wd=" + oWd);
		} else if(oType == "cp") {
			if(ozhi == 'Surface Book') {
				window.open("http://product.yesky.com/product/965/965393/", "_blank");
				return false;
			} else {
				document.getElementById('selectform').setAttribute("action", "http://search.yesky.com/searchproduct.do?wd=" + oWd);
			}
		} else if(oType == "tp") {
			document.getElementById('selectform').setAttribute("action", "http://search.yesky.com/searchpicture.do?wd=" + oWd);
		} else if(oType == "bj") {
			document.getElementById('selectform').setAttribute("action", "http://search.yesky.com/searchproduct.do?wd=" + oWd);
		} else if(oType == "xz") {
			document.getElementById('selectform').setAttribute("action", "http://search.yesky.com/searchdownload.do?wd=" + oWd);
		}
	});
}

//收藏
function AddFavorite(title, url) {
	try{
		window.external.addFavorite(url, title);
	} catch(e) {
		try {
			window.sidebar.addPanel(title, url, "");
		} catch(e) {
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n请使用快捷键Ctrl+D进行添加！");
		}
	}
}
//判断浏览器
function bro(){
	var user = navigator.userAgent.toLowerCase();
	var bro;
	var bro1 = {};
	(bro = user.match(/version\/([\d.]+).*safari/)) ? bro1.safari = bro[1] : 0;
	if(bro1.safari){
	}
}// JavaScript Document