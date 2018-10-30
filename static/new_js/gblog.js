/*G-blog*/


//search area
$(function () {
    var searchTogBtn = $(".search-box");
    var searchMainContent = $(".search-main");
    var searchIpt = $("#search-txt");
    var searchBtn = $("#search-btn");
    var searchNote = $(".search-note");

    //点击放大镜 隐藏本身和显示搜索区域
    searchTogBtn.on("click", function () {
        searchTogBtn.hide("slow",function(){
            searchMainContent.show("fast");
        });
    });
    //点击搜索按钮搜索
    searchBtn.on("click", function () {
        if (searchIpt.val() != "") {
            $(window).attr('location', '/blog/search_list?searchtxt=' + searchIpt.val());
        } else {
            searchNote.html("Open ur eyes,SEARCH!").css("color", "rgba(255,0,0,.6)");
        }
    })
    //回车搜索
    searchIpt.bind("keypress", function (event) {
        if ((event.keyCode == "13") && (searchIpt.val() != "")) {
            $(window).attr('location', '/blog/search_list?searchtxt=' + searchIpt.val());
        }
    })

    //评论区按钮功能事件
    var showComment = $("#post-message");
    var commentMain = $(".post-message-main");
    var cancelPost = $("#cancel-post")
    showComment.click(function () {
        showComment.hide();
        commentMain.show();
        return false;
    });
    cancelPost.click(function () {
        commentMain.hide();
        showComment.show();
        return false;
    });
})
//back to top
$(function() {
    var $backToTop = $('#back-to-top');
    $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
    	$backToTop.fadeIn(1000);
    } else {
	$backToTop.fadeOut(1000);
    }
    });
    $backToTop.click(function () {
	$('body,html').animate({scrollTop: 0});
    });
})

//add active class to respective category, should be placed first
var win_path = window.location.pathname.slice(6, -1);
//var query_id = win_path.match(/(test|django|machine-learning|git|web-design|web-spider|editor|system|cpp|qt|cmake|browser)/g);
var query_id = win_path.match(/(Python|Django|Prog-Flask|HTML|CSS|JavaScript|Web-Spider|Algorithm|SQL)/g);
if (query_id) {
    query_id = query_id[0];
}

var res_obj = document.getElementById(query_id);
if (res_obj)
    res_obj.className += "active";

var category_type = new Array("Python", "Django", "Prog-Flask", "HTML", "CSS", "JavaScript", "Web-Spider", "Algorithm","SQL");
var category_color = new Array("#2C3E50", "#003366", "#333388", "#336666", "#006699", "#666699", "#666666", "#009966", "#669966","#217598", "#005A5F", "#008373");

/*** ATTENTION! when use the querid obj, ASK if it exists first! ***/
//change blog-home category color
for (var i = 0; i < category_type.length; ++i) {
    obj = document.getElementsByClassName(category_type[i] + "-grid-out");
    cate_type = category_type[i];
    color = category_color[i];

    var blog_grid = document.getElementsByClassName("blog-home-category-grid");
    if (blog_grid.length) {
        create_home_cate(cate_type, color);
    }
}

//create home category div and tell how their colors change
function create_home_cate(cate_type, color) {
    var blog_grid = document.getElementsByClassName("blog-home-category-grid");

    var out_grid = document.createElement("div");
    out_grid.setAttribute("class", "col-md-4 " + cate_type + "-grid-out");
    out_grid.style.margin = "30px 0px 20px 0px";
    blog_grid[0].appendChild(out_grid);

    var cate_a = document.createElement("a");
    cate_a.setAttribute("href", "/blog/" + cate_type);
    out_grid.appendChild(cate_a);

    var in_grid = document.createElement("div");
    in_grid.setAttribute("class", "blog-div-grid " + cate_type + "-grid");
    in_grid.style.backgroundColor = color;
    cate_a.appendChild(in_grid);

    var svg_object = document.createElement("object");
    svg_object.className = "icon-blog-div svg-ico";
    svg_object.data = "static/images/cate/" + cate_type + ".svg";
    in_grid.appendChild(svg_object);

    var cate_a_text = document.createTextNode(cate_type);
    in_grid.appendChild(cate_a_text);

    //Change color
    svg_object.onload = function () {
        load_home_cat(svg_object)
    };
    out_grid.onmouseover = function () {
        mover_home_cat(out_grid, in_grid, color)
    };
    out_grid.onmouseout = function () {
        mout_home_cat(out_grid, in_grid, color)
    };
}

function load_home_cat(obj) {
    obj.contentDocument.getElementsByTagName("svg")[0].style.fill = "white";
}

function mover_home_cat(obj, subObj, color) {
    //console.log("over");
    subObj.style.backgroundColor = "#ECF0F1";
    obj.getElementsByTagName("a")[0].style.color = color;
    //var tmpobj = obj.getElementsByTagName("object")[0].contentDocument;
    //tmpobj.getElementsByTagName("svg")[0].style.fill = color;
}

function mout_home_cat(obj, subObj, color) {
    //console.log("out");
    subObj.style.backgroundColor = color;
    obj.getElementsByTagName("a")[0].style.color = "white";
    //var tmpobj = obj.getElementsByTagName("object")[0].contentDocument;
    //tmpobj.getElementsByTagName("svg")[0].style.fill = "white";
}

//change category color
for (var i = 0; i < category_type.length; ++i) {
    var cate_type = category_type[i];
    var color = category_color[i];
    var cate_ul = document.getElementsByClassName("cate-list");

    if (cate_ul.length) {
        post_list = document.getElementsByClassName("post-list");
        if (query_id == cate_type) {
            //this line is to store the cate-color, or the onmouse function will use the last cate-color
            cate_color = color;
            for (var j = 0; j < post_list.length; j++) {
                post_list[j].onmouseover = function () {
                    mover_post_list(this, cate_color)
                };
                post_list[j].onmouseout = function () {
                    mout_post_list(this)
                };
            }
        }

        create_cate_list(cate_type, color);
    }

}

function mover_post_list(post, color) {
    //console.log("color: ", color);
    post.getElementsByTagName("a")[0].style.color = color;
}

function mout_post_list(post, color) {
    post.getElementsByTagName("a")[0].style.color = "#16A085";
}

function create_cate_list(cate_type, color) {

    var cate_ul = document.getElementsByClassName("cate-list");

    var cate_li = document.createElement("li");
    cate_li.setAttribute("id", cate_type);
    if (query_id == cate_type) {
        cate_li.setAttribute("class", "active");
        cate_li.style.backgroundColor = color;
        document.getElementById("greeting-sentence").style.color = color;
        document.getElementsByClassName("navbar-inverse")[0].style.backgroundColor = color;
        document.getElementById("navbar-blog-a").style.color = color;
        document.getElementById("navbar-blog-a").style.backgroundColor = "#ECF0F1";
    }
    cate_ul[0].appendChild(cate_li);

    var cate_a = document.createElement("a");
    cate_a.setAttribute("href", "/blog/" + cate_type);
    if (query_id == cate_type) {
        cate_a.style.color = "white";
    }
    else {
        cate_a.style.color = "#BDC3C7"
    }
    cate_li.appendChild(cate_a);

    var svg_object = document.createElement("object");
    svg_object.className = "icon-blog-li";
    svg_object.data = "/static/images/cate/" + cate_type + ".svg";
    cate_a.appendChild(svg_object);

    var cate_a_text = document.createTextNode(cate_type);
    cate_a.appendChild(cate_a_text);

    //Change box & svg color
    change_category_color(cate_li, color);
    //svg_object.onload = function () {
    //    load_cate_li(cate_li, color)
    //};
}

function change_category_color(obj, color) {

    //console.log(obj);
    obj.onmouseover = function () {
        mover_category(this, color)
    };
    obj.onmouseout = function () {
        mout_category(this, color)
    };
}
//svg??????????? ???????#BDC3C7
//function load_cate_li(obj, color) {
//    if ("active" == obj.className) {
//        tmpobj = obj.getElementsByTagName("object")[0].contentDocument;
//        tmpobj.getElementsByTagName("svg")[0].style.fill = "white";
//    }
//    else {
//        tmpobj = obj.getElementsByTagName("object")[0].contentDocument;
//        tmpobj.getElementsByTagName("svg")[0].style.fill = "#BDC3C7";
//    }
//
//}

function mover_category(obj, color) {
    obj.style.backgroundColor = "#ECF0F1";
    obj.getElementsByTagName("a")[0].style.color = color;
    //???????box???svg???
    //tmpobj = obj.getElementsByTagName("object")[0].contentDocument;
    //tmpobj.getElementsByTagName("svg")[0].style.fill = color;
}

function mout_category(obj, color) {
    if ("active" == obj.className) {
        obj.style.backgroundColor = color;
        obj.getElementsByTagName("a")[0].style.color = "white";
        //??????box???svg???
        //tmpobj = obj.getElementsByTagName("object")[0].contentDocument;
        //tmpobj.getElementsByTagName("svg")[0].style.fill = "white";
    }
    else {
        obj.style.backgroundColor = "white";
        obj.getElementsByTagName("a")[0].style.color = "#BDC3C7";
        //??????box???svg???
        //tmpobj = obj.getElementsByTagName("object")[0].contentDocument;
        //tmpobj.getElementsByTagName("svg")[0].style.fill = "#BDC3C7";
    }
}
