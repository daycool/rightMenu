Dim wsh, AppPath, cmd
Set oArgs = WScript.Arguments
If oArgs.count =1 Then
	cmd = oArgs(0)
End If

' MsgBox cmd
' cmd = npm install
AppPath="""C:/Windows/System32/cmd.exe"""
Set wsh=WScript.CreateObject("WScript.Shell")
wsh.Run AppPath
WScript.Sleep 200
wsh.SendKeys cmd
wsh.SendKeys "{ENTER}"