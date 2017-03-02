var storage = chrome.storage.local;	

function start() {
	var hostName = "daycool.native";
	var app = chrome.runtime.connectNative(hostName);
	// app.postMessage('AltRun');
}

$(function() {

	getUnkonwWord(function(data){
		// var unknowWord = Object.keys(data.unknowWord || {});
		var tmpl = '';
		var index = 0;
		$.each(data.unknowWord || {}, function(key){
			tmpl += '<tr>';
			tmpl += '<td>'+ (++index) +'</td>';
			tmpl += '<td class="word">'+ key +'</td>';
			tmpl += '<td>';
			tmpl += '<a class="btn btn-danger btn-xs pull-right know-word">认识</a>';
			tmpl += '<a class="btn btn-warning btn-xs pull-right unknow-word">不认识</a>';
			tmpl += '</td>';
			tmpl += '</tr>';
		});

		$('#unkonw-dict-content').html(tmpl);
	});

	var socket = io.connect('http://localhost:8001');

	$('#open-document').click(function() {
		socket.emit('startNativeApp', {type: 'openDocument'});
	});
	
	$('#open-dos').click(function() {
		socket.emit('startNativeApp', {type: 'openDos'});
	});

	$('#test-online').click(function() {
		socket.emit('startNativeApp', {type: 'testOnline'});
	});

	$('#product-online').click(function() {
		socket.emit('startNativeApp', {type: 'productOnline'});
	});

	$('#create-component').click(function() {
		$(this).siblings('ul').removeClass('hide');
	});

	$('#create-component-sms').click(function() {
		socket.emit('startNativeApp', {type: 'createComponentSms'});
	});
	
	$('#create-component-oms').click(function() {
		socket.emit('startNativeApp', {type: 'createComponentOms'});
	});	

	$('#start').click(function() {
		start();
	});	

	$('#save-dict-content').click(function() {
		var dictContent = $('#dict-content').val();
		var dictWordMap = getDictWordMap(dictContent);
		saveDictWord(dictWordMap);
	});	


	$('body').on('click', '.know-word', function(){
		var $commonParent = $(this).closest('tr');
		var $word = $commonParent.find('.word');
		var wordStr = $word.text();
		dictWordMap = {};
		dictWordMap[wordStr] = wordStr;
		saveDictWord(dictWordMap);
		$commonParent.remove();
	});

	$('body').on('click', '.unknow-word', function(){
		var $commonParent = $(this).closest('tr');
		var $word = $commonParent.find('.word');
		var wordStr = $word.text();

		$.get("http://dict.youdao.com/wordbook/ajax?action=addword&q=" + wordStr + "&date=" + (new Date()).toString(), {
           le: 'eng'
        }, function(resData){
        	if(resData.message == 'adddone'){
        		$commonParent.remove();
        	}else{
        		console.log(resData)
        		alert('加入有道词典失败');
        	}
        });            
	});

	socket.on('news', function(data) {
		console.log(data);
	});
});

function saveDictWord(dictWordMap){
	storage.get('dict', function(e){
		var preDictWordMap = e.dict.dictWord || {};
		var preUnknowWordMap = e.dict.unknowWord || {};
		$.each(dictWordMap, function(key){
			delete preUnknowWordMap[key];
		});
		var currDictWordMap = $.extend({}, preDictWordMap, dictWordMap);
		storage.set({dict: {
			dictWord: currDictWordMap,
			unknowWord: preUnknowWordMap,
		}});
	});
}

function getDictWordMap(dictContent){
	// var wordReg = /\d+,\s(\w+)/g;
	var wordReg = /[a-zA-Z]{3,}/g;
	var map = {};
	var matches = dictContent.match(wordReg);

	$.each(matches, function(_, word){
		map[word] = word;
	});

	return map;
}

function getUnkonwWord(cb){
	storage.get('dict', function(e){
		cb(e.dict);
	});
}