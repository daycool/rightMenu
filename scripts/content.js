var isSelectElem = false;
var hideElem = null;

//复制input内容，一般用来复制密码框
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

$(document).on('keydown', function(e){
	var elem = e.target;
	if(!e.altKey && e.key == 'h' && isSelectElem){
		if(hideElem){
			$(hideElem).hide();
		}
	}else if(e.altKey && e.key == 'h'){
		isSelectElem = !isSelectElem;
	}
});


// var isSelectElem = true;
var thread = null;
$('*').hover(function(){
	if(isSelectElem){
		var $currElem = $(this);
		cancelSelectThread();
		
		thread = setTimeout(function(){
			thread = null;
			
			var originStyle = {
				border: $currElem.css('border'),
				// position: $currElem.css('position')
			};
			var newStyle = {
				border: '1px solid red !important',
				// position: 'relative !important',
			};
			var cssText = '';
			$.each(newStyle, function(key, val){
				cssText += key + ':' + val + ';';
			});

			$currElem.css({cssText: cssText});
			$currElem.data('originStyle', originStyle);
			hideElem = $currElem;
			cancelElemStyle($currElem.parent());
		}, 150);
	}
}, function(){
	if(isSelectElem){
		cancelSelectThread();
		cancelElemStyle(this);
	}
});

function cancelSelectThread(){
	if(thread){
		hideElem = null;
		clearTimeout(thread);
		thread = null;
	}
}

function cancelElemStyle(currElem){
	var $currElem = $(currElem);
	var originStyle = $currElem.data('originStyle') || '';
	if(originStyle){
		$currElem.css(originStyle);
	}

	if($currElem.parent().length){
		cancelElemStyle($currElem.parent());
	}
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.type == 'selectElem'){
		isSelectElem = !isSelectElem;

		sendResponse({
			code: 200,
			status: "selectElem"
		});
	}
});	