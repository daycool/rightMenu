Dim wsh, AppPath, cmd
AppPath="""C:/Windows/System32/cmd.exe"""
Set wsh=WScript.CreateObject("WScript.Shell")
wsh.Run AppPath
WScript.Sleep 200
wsh.SendKeys "cd D:/weimi/git/uedprojects_ams/sms/shihui"
wsh.SendKeys "{ENTER}"
wsh.SendKeys "D:"
wsh.SendKeys "{ENTER}"
wsh.SendKeys "yo shihui"
wsh.SendKeys "{ENTER}"