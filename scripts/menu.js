function genericOnClick(info, tab) { 
alert(info.linkUrl); 
} 
function selectionOnClick(info, tab) { 
alert(info.selectionText); 
} 
var link = chrome.contextMenus.create({"title": "链接地址","contexts":["link"],"onclick":genericOnClick}); 
var selection = chrome.contextMenus.create({"title": "选中文字","contexts":["selection"],"onclick":selectionOnClick}); 