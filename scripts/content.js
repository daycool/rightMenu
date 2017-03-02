var isSelectElem = false;
var hideElem = null;
var storage = chrome.storage.local;	

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
		if(!isSelectElem && hideElem){
			cancelElemStyle(hideElem);
		}
	}
});


// var isSelectElem = true;
var thread = null;
$('body').on('mouseenter', '*', function(e){
	if(isSelectElem){
		e.stopPropagation();
		var $currElem = $(this);
		cancelSelectThread();
		
		thread = setTimeout(function(){
			thread = null;
			
			addElemStyle($currElem);
			hideElem = $currElem;
			// cancelElemStyle($currElem.parent());
		}, 150);
		
	}
});

$('body').on('mouseleave', '*', function(e){
	if(isSelectElem){
		e.stopPropagation();
		var $currElem = $(this);
		cancelSelectThread();
		cancelElemStyle($currElem);
		thread = setTimeout(function(){
			addElemStyle($currElem.parent());
		}, 50);
	}
});

$('body').on('click', '*', function(e){
	if(isSelectElem){
		console.log('来做点什么吧')
	}
});



// $('*').hover(function(){
// 	if(isSelectElem){
// 		var $currElem = $(this);
// 		cancelSelectThread();
		
// 		thread = setTimeout(function(){
// 			thread = null;
			
// 			addElemStyle($currElem);
// 			hideElem = $currElem;
// 			// cancelElemStyle($currElem.parent());
// 		}, 150);
// 	}
// }, function(){
// 	if(isSelectElem){
// 		var $currElem = $(this);
// 		cancelSelectThread();
// 		cancelElemStyle($currElem);
// 		thread = setTimeout(function(){
// 			addElemStyle($currElem.parent());
// 		}, 150);
// 	}
// });

function cancelSelectThread(){
	if(thread){
		hideElem = null;
		clearTimeout(thread);
		thread = null;
	}
}

function addElemStyle(currElem){
	var $currElem = $(currElem);
	var originStyle = {
		outline: $currElem.css('outline'),
	};
	var newStyle = {
		outline: '1px solid red !important',
	};
	var cssText = '';
	$.each(newStyle, function(key, val){
		cssText += key + ':' + val + ';';
	});

	$currElem.css({cssText: cssText});
	$currElem.data('originStyle', originStyle);

	cancelElemStyle($currElem.parent());
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

storage.get('dict', function(e){
	if(e && e.dict){
		var content = document.body.innerText;
		var dictWordMap = e.dict.dictWord;
		var nowWordMap = pageContentWordMap(content);
		var unknowWordMap = getUnknowWord(dictWordMap, nowWordMap);
		storage.set({dict:
			{
				dictWord: dictWordMap,
				unknowWord: unknowWordMap
			}
		});
	}
});


function pageContentWordMap(pageContent){
	var wordReg = /([a-zA-Z]){3,}/ig;
	var map = {};
	pageContent = (pageContent || '').toLocaleLowerCase();
	var matches = pageContent.match(wordReg);

	$.each(matches, function(_, word){
		map[word] = word;
	});

	return map;
}

function getUnknowWord(knowWordMap, nowWordMap){
	var unknowWord = {};

	$.each(nowWordMap, function(key, val){
		if(!knowWordMap[key]){
			unknowWord[key] = key;
		}
	});

	return unknowWord;
}

