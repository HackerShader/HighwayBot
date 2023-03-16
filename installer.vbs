intAnswer = _
    Msgbox("This script will be launch at Installer.js and install HighwayBot into your computer. Do you want to process?", _
        vbYesNo, "HighwayBot Installer for Windows")
If intAnswer = vbYes Then
    yesanswer = Msgbox("The script is being ran. Click 'OK' to continue", _
                vbInformation, "HighwayBot Installer for Windows")
    Set oShell = WScript.CreateObject ("WScript.Shell")
    oShell.run "node Installer.js"
Else
    yesanswer = Msgbox("Cancelled request", _
                vbInformation, "HighwayBot Installer for Windows")
End If