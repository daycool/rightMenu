
var cmd = "";
cmd = 'D:/my/chromePlugin/rightMenu/cmds/autoCmd.vbs';
cmd += '';

runNative(cmd);

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
