#$testFile = "D:\Temp\data\pipo.csv"

function GetNbLines {
[cmdletbinding()]
Param (
    [string]$FileName
)
Process {
    $count = 0
    try {
        $stream = New-Object -TypeName System.IO.FileStream(
            $FileName,
            [System.IO.FileMode]::Open,
            [System.IO.FileAccess]::Read,
            [System.IO.FileShare]::ReadWrite)
        if ($stream) {
            $reader = New-Object IO.StreamReader $stream
            if ($reader) {
                while(-not ($reader.EndOfStream)) { [void]$reader.ReadLine(); $count++ }
                $reader.Close()
            }
            $stream.Close()
        }
        return $count
    }
    catch
    {
        return 0
    }
}}

function GetNbFilesInDir {
[cmdletbinding()]
Param (
    [string]$DirName
)
Process {
    $fileList = Get-ChildItem -Path $DirName -Recurse
    foreach ($file in $FileList) {
        $fullName = $file.FullName
        $ext = $file.Extension
        $nbLines = GetNbLines($fullName)
        Write-Output ($fullName + ";" + $ext + ";" + $nbLines)
    }
}}

#$nbLines = GetNbLines $testFile
#Write-Output ("Count: " + $nbLines)

#GetNbFilesInDir -DirName "D:\Work\Dev\NewPortalAdmin"
GetNbFilesInDir -DirName "C:\Users\florianaurousseau\Groupe Charlois\DSI - General\Equipe\Florian\OENOSYLVA - Calculateur\Code\dev\src\code"
