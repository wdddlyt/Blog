/**
 * Created by python on 18-10-22.
 */
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
