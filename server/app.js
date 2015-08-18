var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8001);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	// socket.emit('news', {
	// 	hello: 'world'
	// });
	socket.on('startNativeApp', function(data) {
		var cmd = '';
		if(data.type == 'testOnline'){
			cmd = 'D:/weimi/git/uedtools.git/autoCmd/testOnline.exe';
		}else if(data.type == 'productOnline'){
            cmd = 'D:/weimi/git/uedtools.git/autoCmd/productOnline.exe';
		}else if(data.type == 'openDocument'){
            cmd = 'start D:/weimi/文档';
		}else if(data.type == 'openDos'){
			cmd = 'D:/my/chromePlugin/rightMenu/cmdInRun.vbs';
			if(data.param){
				cmd += ' "' + data.param + '"';
			}
		}
        runNative(cmd);
	});
});

function runNative(cmd){
	var exec = require('child_process').exec;
	exec(cmd, {encoding: "utf8"}, function(error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		} else {
		}
	});
}
