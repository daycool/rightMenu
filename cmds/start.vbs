Dim wsh, AppPath, cmd

' MsgBox cmd
' cmd = npm install
AppPath="""C:/Windows/System32/cmd.exe"""
Set wsh=WScript.CreateObject("WScript.Shell")
wsh.Run AppPath
WScript.Sleep 200
wsh.SendKeys "d:"
wsh.SendKeys "{ENTER}"
WScript.Sleep 200
wsh.SendKeys "cd D:/my/chromePlugin/rightMenu"
wsh.SendKeys "{ENTER}"
WScript.Sleep 200
wsh.SendKeys "pm2 start server/app.js"
wsh.SendKeys "{ENTER}"