this["T"] = this["T"] || {};
this["T"]["comments"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (list, undefined) {
// iterate list
;(function(){
  var $$obj = list;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var c = $$obj[$index];

if ( c.data_id)
{
buf.push("<a href=\"javascript:\"" + (jade.attr("data-id", "" + (c.data_id) + "", true, false)) + (jade.attr("data-cnt", "" + (c.like_cnt) + "", true, false)) + (jade.cls(['comment',"color-" + (c.background_color) + ""], [null,true])) + ">" + (jade.escape(null == (jade_interp = c.comment) ? "" : jade_interp)) + "</a>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var c = $$obj[$index];

if ( c.data_id)
{
buf.push("<a href=\"javascript:\"" + (jade.attr("data-id", "" + (c.data_id) + "", true, false)) + (jade.attr("data-cnt", "" + (c.like_cnt) + "", true, false)) + (jade.cls(['comment',"color-" + (c.background_color) + ""], [null,true])) + ">" + (jade.escape(null == (jade_interp = c.comment) ? "" : jade_interp)) + "</a>");
}
    }

  }
}).call(this);
}.call(this,"list" in locals_for_with?locals_for_with.list:typeof list!=="undefined"?list:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
this["T"]["table"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (girl, undefined) {
buf.push("<div class=\"girl-name\"><img" + (jade.attr("src", "" + (girl.name) + "", true, false)) + "/><a href=\"javascript:\" class=\"a-off\"><img src=\"image/a-off.png\"/></a><a href=\"javascript:\" class=\"a-on\"><img src=\"image/a-on.png\"/></a><audio" + (jade.attr("src", "" + (girl.audio) + "", true, false)) + "><p>你的浏览器不支持audio标签</p></audio></div><div class=\"icon-table1\"><div class=\"table\"><table><tbody><tr><th>昵称</th><td class=\"first\">" + (jade.escape(null == (jade_interp = girl.nickname) ? "" : jade_interp)) + "</td><th>血型</th><td class=\"last\">" + (jade.escape(null == (jade_interp = girl.xuexing) ? "" : jade_interp)) + "</td></tr><tr><th>生日</th><td class=\"first\">" + (jade.escape(null == (jade_interp = girl.birthday) ? "" : jade_interp)) + "</td><th>身高</th><td class=\"last\">" + (jade.escape(null == (jade_interp = girl.height) ? "" : jade_interp)) + "</td></tr><tr><th>星座</th><td class=\"first\">" + (jade.escape(null == (jade_interp = girl.xingzuo) ? "" : jade_interp)) + "</td><th>特长</th><td class=\"last\">" + (jade.escape(null == (jade_interp = girl.techang) ? "" : jade_interp)) + "</td></tr><tr><th>兴趣</th><td class=\"first\">" + (jade.escape(null == (jade_interp = girl.hobby) ? "" : jade_interp)) + "</td><th>所属</th><td class=\"last\">" + (jade.escape(null == (jade_interp = girl.team) ? "" : jade_interp)) + "</td></tr></tbody></table></div></div><div class=\"icon-table2\">");
// iterate girl.jineng
;(function(){
  var $$obj = girl.jineng;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var jn = $$obj[i];

buf.push("<div" + (jade.attr("data-desc", "" + (jn.desc) + "", true, false)) + (jade.cls(['skill',"" + (i==0?'active':'') + ""], [null,true])) + "><img" + (jade.attr("src", "" + (jn.icon) + "", true, false)) + "/></div>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var jn = $$obj[i];

buf.push("<div" + (jade.attr("data-desc", "" + (jn.desc) + "", true, false)) + (jade.cls(['skill',"" + (i==0?'active':'') + ""], [null,true])) + "><img" + (jade.attr("src", "" + (jn.icon) + "", true, false)) + "/></div>");
    }

  }
}).call(this);

buf.push("<div class=\"desc\">" + (jade.escape(null == (jade_interp = (girl.jineng[0] && girl.jineng[0].desc) || '') ? "" : jade_interp)) + "</div></div>");}.call(this,"girl" in locals_for_with?locals_for_with.girl:typeof girl!=="undefined"?girl:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};