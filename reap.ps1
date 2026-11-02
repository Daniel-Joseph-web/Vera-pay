<#
.SYNOPSIS
    Verapay Codebase Reaper - Gathers frontend, backend, or both into a single consolidated file.

.DESCRIPTION
    Harvesters / gathers all source code, components, and configuration files for:
      - Frontend: Next.js pages, components, styles, stores, hooks, utils, configs
      - Backend:  Express routes, controllers, services, middleware, prisma schema, configs
      - Both:     Full codebase including shared types, frontend, and backend

    Excludes binary assets, node_modules, .next, dist, lockfiles, and private secret env files.
    Outputs a clean, structured bundle with Table of Contents and file headers.

.PARAMETER Target
    Service or codebase to gather:
      - 'frontend' (aliases: 'fe', 'front', 'ui', 'client', 'next')
      - 'backend'  (aliases: 'be', 'back', 'server', 'api')
      - 'both'     (aliases: 'all', 'everything', 'codebase', 'full') [Default: 'both']
      - 'help'     (aliases: '-h', '--help')

.PARAMETER OutFile
    Custom output file path. If omitted, defaults to:
      - frontend -> 'frontend_gathered.txt'
      - backend  -> 'backend_gathered.txt'
      - both     -> 'codebase_gathered.txt'

.EXAMPLE
    .\reap.ps1 frontend
    Gathers all frontend files into frontend_gathered.txt

.EXAMPLE
    .\reap.ps1 backend
    Gathers all backend files into backend_gathered.txt

.EXAMPLE
    .\reap.ps1 both
    Gathers all frontend, backend, and shared files into codebase_gathered.txt

.EXAMPLE
    .\reap.ps1 frontend -OutFile custom_frontend.txt
#>

[CmdletBinding()]
param(
    [Parameter(Position = 0, Mandatory = $false)]
    [string]$Target = "both",

    [Parameter(Position = 1, Mandatory = $false)]
    [string]$OutFile = ""
)

$WorkspaceRoot = $PSScriptRoot
if (-not $WorkspaceRoot) {
    $WorkspaceRoot = (Get-Location).Path
}

function Write-Banner {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor DarkCyan
    Write-Host "             VERAPAY CODE REAPER / GATHERER               " -ForegroundColor Cyan
    Write-Host "==========================================================" -ForegroundColor DarkCyan
}

function Show-Help {
    Write-Banner
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\reap.ps1 [frontend | backend | both] [output_file]" -ForegroundColor White
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  frontend   Gather all frontend source files into a file" -ForegroundColor White
    Write-Host "  backend    Gather all backend source files into a file" -ForegroundColor White
    Write-Host "  both       Gather both frontend and backend (plus shared) into a file (default)" -ForegroundColor White
    Write-Host "  help       Display this usage information" -ForegroundColor White
    Write-Host ""
    Write-Host "Default Output Files:" -ForegroundColor Yellow
    Write-Host "  frontend -> frontend_gathered.txt" -ForegroundColor White
    Write-Host "  backend  -> backend_gathered.txt" -ForegroundColor White
    Write-Host "  both     -> codebase_gathered.txt" -ForegroundColor White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\reap.ps1 frontend" -ForegroundColor Green
    Write-Host "  .\reap.ps1 backend" -ForegroundColor Green
    Write-Host "  .\reap.ps1 both" -ForegroundColor Green
    Write-Host "  .\reap.ps1 frontend custom_frontend_bundle.txt" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor DarkCyan
    Write-Host ""
}

# Directories and file patterns to ignore
$IgnoreFolderPatterns = @(
    '\\node_modules\\',
    '\\\.next\\',
    '\\dist\\',
    '\\build\\',
    '\\out\\',
    '\\\.git\\',
    '\\\.turbo\\',
    '\\\.cache\\'
)

$IgnoredFolderNames = @(
    'node_modules',
    '.next',
    'dist',
    'build',
    'out',
    '.git',
    '.turbo',
    '.cache'
)

$IgnoreFileNames = @(
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.env',
    '.env.local',
    '.env.production'
)

$AllowedExtensions = @(
    '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
    '.json', '.css', '.scss', '.html',
    '.prisma', '.sql', '.md', '.txt'
)

function Test-IsIncludedFile([System.IO.FileInfo]$file) {
    # Check ignored file names
    if ($IgnoreFileNames -contains $file.Name) {
        return $false
    }

    # Always include .env.example
    if ($file.Name -eq '.env.example') {
        return $true
    }

    # Check extension
    $ext = $file.Extension.ToLower()
    if ($AllowedExtensions -contains $ext) {
        return $true
    }

    return $false
}

function Collect-Files([string[]]$SourceDirectories) {
    $results = [System.Collections.Generic.List[System.IO.FileInfo]]::new()

    foreach ($dir in $SourceDirectories) {
        $fullPath = Join-Path $WorkspaceRoot $dir
        if (-not (Test-Path $fullPath)) {
            continue
        }

        $dirsToVisit = [System.Collections.Generic.Queue[System.IO.DirectoryInfo]]::new()
        $dirsToVisit.Enqueue([System.IO.DirectoryInfo]::new($fullPath))

        while ($dirsToVisit.Count -gt 0) {
            $currentDir = $dirsToVisit.Dequeue()

            try {
                foreach ($file in $currentDir.GetFiles()) {
                    if (Test-IsIncludedFile $file) {
                        $results.Add($file)
                    }
                }

                foreach ($subDir in $currentDir.GetDirectories()) {
                    if (-not ($IgnoredFolderNames -contains $subDir.Name.ToLower())) {
                        $dirsToVisit.Enqueue($subDir)
                    }
                }
            } catch { }
        }
    }

    # Sort files deterministically by relative path
    return @($results | Sort-Object { $_.FullName })
}

function Gather-Codebase([string]$TargetName, [string[]]$SourceDirs, [string]$DestinationFile) {
    Write-Host ""
    Write-Host "[*] Scanning directories for ${TargetName}: ($($SourceDirs -join ', '))..." -ForegroundColor Cyan

    $files = Collect-Files -SourceDirectories $SourceDirs

    if ($files.Count -eq 0) {
        Write-Host " [!] No matching source files found for $TargetName!" -ForegroundColor Red
        return
    }

    Write-Host "  Found $($files.Count) file(s) to gather." -ForegroundColor Magenta

    $targetFile = if ([System.IO.Path]::IsPathRooted($DestinationFile)) {
        $DestinationFile
    } else {
        Join-Path $WorkspaceRoot $DestinationFile
    }

    # Ensure parent directory exists
    $parentDir = [System.IO.Path]::GetDirectoryName($targetFile)
    if ($parentDir -and -not (Test-Path $parentDir)) {
        [void][System.IO.Directory]::CreateDirectory($parentDir)
    }

    $sb = [System.Text.StringBuilder]::new()
    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

    # Header
    [void]$sb.AppendLine("=" * 80)
    [void]$sb.AppendLine("VERAPAY CODE REAPER HARVEST: $TargetName".ToUpper())
    [void]$sb.AppendLine("Generated:  $timestamp")
    [void]$sb.AppendLine("Source(s):  $($SourceDirs -join ', ')")
    [void]$sb.AppendLine("Total Files: $($files.Count)")
    [void]$sb.AppendLine("=" * 80)
    [void]$sb.AppendLine("")

    # Table of Contents
    [void]$sb.AppendLine("TABLE OF CONTENTS:")
    $fileIndex = 1
    $totalBytes = 0
    $totalLines = 0

    foreach ($f in $files) {
        $relPath = $f.FullName.Substring($WorkspaceRoot.Length).TrimStart('\', '/')
        $sizeKb = [Math]::Round($f.Length / 1024, 2)
        $totalBytes += $f.Length
        [void]$sb.AppendLine("  $("{0,3}" -f $fileIndex). $relPath ($sizeKb KB)")
        $fileIndex++
    }

    [void]$sb.AppendLine("")
    [void]$sb.AppendLine("=" * 80)
    [void]$sb.AppendLine("FILE CONTENTS")
    [void]$sb.AppendLine("=" * 80)
    [void]$sb.AppendLine("")

    # Append each file's content
    $currentIndex = 1
    foreach ($f in $files) {
        $relPath = $f.FullName.Substring($WorkspaceRoot.Length).TrimStart('\', '/')
        Write-Host "  [$currentIndex/$($files.Count)] Gathering: $relPath" -ForegroundColor DarkGray

        try {
            $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
            $lineCount = if ([string]::IsNullOrEmpty($content)) { 0 } else { ($content -split "`r`n|`r|`n").Length }
            $totalLines += $lineCount

            [void]$sb.AppendLine("=" * 80)
            [void]$sb.AppendLine("FILE [$currentIndex/$($files.Count)]: $relPath")
            [void]$sb.AppendLine("Lines: $lineCount | Size: $($f.Length) bytes")
            [void]$sb.AppendLine("=" * 80)
            [void]$sb.AppendLine($content)
            if (-not $content.EndsWith("`n")) {
                [void]$sb.AppendLine("")
            }
            [void]$sb.AppendLine("-" * 80)
            [void]$sb.AppendLine("END OF FILE: $relPath")
            [void]$sb.AppendLine("-" * 80)
            [void]$sb.AppendLine("")
        } catch {
            [void]$sb.AppendLine("[ERROR READING FILE: $($_.Exception.Message)]")
            [void]$sb.AppendLine("")
        }

        $currentIndex++
    }

    # Write out with UTF-8 encoding
    [System.IO.File]::WriteAllText($targetFile, $sb.ToString(), [System.Text.Encoding]::UTF8)

    $finalSizeKb = [Math]::Round((Get-Item $targetFile).Length / 1024, 2)

    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host " [OK] SUCCESS! Gathered $TargetName into single file." -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  Destination : $targetFile" -ForegroundColor Yellow
    Write-Host "  Files       : $($files.Count)" -ForegroundColor White
    Write-Host "  Total Lines : $totalLines" -ForegroundColor White
    Write-Host "  Output Size : $finalSizeKb KB" -ForegroundColor White
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host ""
}

# ----------------- Main Execution -----------------

$normalized = $Target.ToLower().Trim()

switch -Regex ($normalized) {
    '^(-h|--help|help|\?)$' {
        Show-Help
        exit 0
    }
    '^(frontend|fe|front|ui|client|next)$' {
        Write-Banner
        $dest = if ($OutFile) { $OutFile } else { "frontend_gathered.txt" }
        Gather-Codebase -TargetName "Frontend" -SourceDirs @("frontend") -DestinationFile $dest
        exit 0
    }
    '^(backend|be|back|server|api|express)$' {
        Write-Banner
        $dest = if ($OutFile) { $OutFile } else { "backend_gathered.txt" }
        Gather-Codebase -TargetName "Backend" -SourceDirs @("backend") -DestinationFile $dest
        exit 0
    }
    '^(both|all|everything|codebase|full)$' {
        Write-Banner
        $dest = if ($OutFile) { $OutFile } else { "codebase_gathered.txt" }
        # Gather frontend, backend, and shared types
        $dirs = @("frontend", "backend", "shared")
        Gather-Codebase -TargetName "Frontend, Backend & Shared Codebase" -SourceDirs $dirs -DestinationFile $dest
        exit 0
    }
    default {
        # Check if user passed an output file name directly (e.g. .\reap.ps1 my_bundle.txt)
        if ($Target -match '\.(txt|md|json)$') {
            Write-Banner
            $dirs = @("frontend", "backend", "shared")
            Gather-Codebase -TargetName "Frontend, Backend & Shared Codebase" -SourceDirs $dirs -DestinationFile $Target
            exit 0
        }

        Write-Banner
        Write-Host " [!] Invalid argument: '$Target'" -ForegroundColor Red
        Show-Help
        exit 1
    }
}
