
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

function clearCache(){
	chrome.browsingData.removeCache({since:0});
}

function clearCookie(){
	chrome.browsingData.removeCookies({since:0});
}
function removeLocalStorage(){
	chrome.browsingData.removeLocalStorage({since:0});
}


// var port = null; 
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
     if (request.type == "launch"){
       	connectToNativeHost(request.message);
    }
	return true;
});

function startNativeApp(){
	var hostName = 'daycool.native';
	var port = chrome.runtime.connectNative(hostName);
}

function runCmd(info){

	var msg = info.selectionText || '';
	var socket = io.connect('http://localhost:8001');
	
	socket.emit('startNativeApp', {type: 'openDos', param: msg});

}

chrome.contextMenus.create({
	"title": "在命令行运行",
	"contexts": ["all"],
	"onclick": runCmd
});

chrome.contextMenus.create({
	"title": "启动本地程序      (Alt+N)",
	"contexts": ["all"],
	"onclick": startNativeApp
});

chrome.contextMenus.create({
	"title": "清除缓存      (Alt+C)",
	"contexts": ["all"],
	"onclick": clearCache
});
chrome.contextMenus.create({
	"title": "清除Cookie      (Alt+K)",
	"contexts": ["all"],
	"onclick": clearCookie
});
chrome.contextMenus.create({
	"title": "清除LocalStorage      (Alt+L)",
	"contexts": ["all"],
	"onclick": removeLocalStorage
});
chrome.contextMenus.create({
	"title": "复制文件路径",
	"contexts": ["link", "frame"],
	"onclick": copyFilePath
});
chrome.contextMenus.create({
	"title": "在新窗口中打开iframe",
	"contexts": ["link", "frame"],
	"onclick": openNewWindow
});
chrome.contextMenus.create({
	"title": "复制文件名",
	"contexts": ["link", "frame"],
	"onclick": copyFileName
});
chrome.contextMenus.create({
	"title": "复制方法名",
	"contexts": ["link", "frame"],
	"onclick": copyMethodName
});

chrome.commands.onCommand.addListener(function(command) {
	console.log('Command:', command);
	if(command === 'clearCache'){
		clearCache();
	}else if(command === 'clearCookie'){
		clearCookie();
	}else if(command === 'clearLocalStrorage'){
		clearLocalStrorage();
	}else if(command === 'startNativeApp'){
		startNativeApp();
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if(request.type == "copyInputValue"){
		document.addEventListener('copy', function (ev) {
		    ev.preventDefault();
		    ev.clipboardData.setData("text/plain", request.data.value);
		    
	  	}, true);
	  	document.execCommand("copy");

		sendResponse({
			code: 200,
			status: "copy OK"
		});
		
	}
});