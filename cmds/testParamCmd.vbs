Dim wsh, AppPath, cmd
Include("vbsJson.vbs")
Set JSON = New VbsJson


Set oArgs = WScript.Arguments

If oArgs.count =1 Then   
    cmd = oArgs(0) 
End If
MsgBox cmd
Set obj = JSON.Decode(cmd)

MsgBox obj("sleep")

AppPath="""C:/Windows/System32/cmd.exe"""
Set wsh=WScript.CreateObject("WScript.Shell")
wsh.Run AppPath
WScript.Sleep 200
wsh.SendKeys cmd
wsh.SendKeys "{ENTER}"

Sub Include(sInstFile) 
    Dim oFSO, f, s 
    Set oFSO = CreateObject("Scripting.FileSystemObject") 
    Set f = oFSO.OpenTextFile(sInstFile) 
    s = f.ReadAll 
    f.Close
    ExecuteGlobal s 
End Sub