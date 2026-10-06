$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
    # Compile directly when the environment cannot launch Vite's auxiliary processes.
    & '.\node_modules\@esbuild\win32-x64\esbuild.exe' src/main.jsx --bundle --minify --outdir=dist/assets --entry-names=app --loader:.jsx=jsx
    if ($LASTEXITCODE -ne 0) { throw 'Production compilation failed.' }
    $html = Get-Content -LiteralPath index.html -Raw
    $html = $html.Replace('<script type="module" src="/src/main.jsx"></script>', '<link rel="stylesheet" href="/assets/app.css"/><script type="module" src="/assets/app.js"></script>')
    Set-Content -LiteralPath dist/index.html -Value $html -Encoding utf8
    Copy-Item -LiteralPath public/icon.svg,public/manifest.webmanifest -Destination dist
    Write-Output 'Production build ready in dist/'
} finally { Pop-Location }
