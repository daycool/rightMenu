function invoke(){
	var hostName = "daycool.native";
	var app = chrome.runtime.connectNative(hostName);
	app.postMessage('AltRun');
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#button1').addEventListener(
      'click', invoke);
});