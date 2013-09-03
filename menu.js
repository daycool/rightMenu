
function openNewWindow(info, tab) { 
	window.open(info.frameUrl);
	console.log(info)
}

function copyFileName(info, tab){
	
	var url = info.frameUrl || info.url;
	var filename = url.split('/').pop().split('.').shift();

	filename || (filename = '无法获取')
	document.addEventListener('copy', function (ev) {
	    ev.preventDefault();
	    ev.clipboardData.setData("text/plain", filename);
	    
  	}, true);
  	document.execCommand("copy");

}

function copyMethodName(info, tab){
	
	var url = info.frameUrl || info.url;
	var filename = /method=(\w+)/.exec(url)[1];

	filename || (filename = '无法获取')
	document.addEventListener('copy', function (ev) {
	    ev.preventDefault();
	    ev.clipboardData.setData("text/plain", filename);
	    
  	}, true);
  	document.execCommand("copy");

}


function copyFilePath(info, tab){
	
	var url = info.frameUrl || info.url;

	
	document.addEventListener('copy', function (ev) {
	    ev.preventDefault();
	    ev.clipboardData.setData("text/plain", url);
	    
  	}, true);
  	document.execCommand("copy");

}

chrome.contextMenus.create({"title": "复制文件路径","contexts":["link","frame"],"onclick":copyFilePath}); 
chrome.contextMenus.create({"title": "在新窗口中打开iframe","contexts":["link","frame"],"onclick":openNewWindow}); 
chrome.contextMenus.create({"title": "复制文件名","contexts":["link","frame"],"onclick":copyFileName}); 
chrome.contextMenus.create({"title": "复制方法名","contexts":["link","frame"],"onclick":copyMethodName}); 

