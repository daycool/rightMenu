$(document).mousedown(function(e){
	var elem = e.target;
	if(e.ctrlKey){
		if(elem.tagName || elem.tagName.toLocaleLowerCase() == 'input'){
			chrome.runtime.sendMessage({type: 'copyInputValue', data: {value: elem.value}}, function(res){
				console.log(res.status);
			});
		}
	}
});