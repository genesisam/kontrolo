$files = Get-ChildItem -Path "C:\Users\Alex\Desktop\kontrolo.webflow (2)\src\pages" -Recurse -Filter "*.astro" | Where-Object { $_.Name -ne "index.astro" -and $_.FullName -notmatch "\\admin\\" }

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    if ($content -match '<MainLayout') { continue }
    
    $title = ""
    if ($content -match '<title>(.*?)</title>') { $title = $matches[1] }
    
    $desc = ""
    if ($content -match '<meta\s+content="([^"]*)"\s+name="description"\s*/>') { $desc = $matches[1] }
    
    # Extract imports before <!DOCTYPE html>
    $imports = ""
    if ($content -match '(?s)^---(.*?)---') {
        $imports = $matches[1].Trim()
        # Remove Header, Footer, PromoPopup imports as they are in MainLayout now
        $imports = $imports -replace 'import Header from.*?\n', ''
        $imports = $imports -replace 'import Footer from.*?\n', ''
        $imports = $imports -replace 'import PromoPopup from.*?\n', ''
    }

    # Remove all the head/html boilerplate up to <Header />
    $topRegex = '(?s)^.*?<body>\s*<Header />'
    
    # We need to construct the new frontmatter
    $newImports = "import MainLayout from '../layouts/MainLayout.astro';`n$imports"
    
    $topReplacement = @"
---
$newImports

const seo = {
  title: "$title",
  description: "$desc"
};
---
<MainLayout seo={seo}>
"@

    $bottomRegex = '(?s)<Footer />.*?</html>'
    $bottomReplacement = "</MainLayout>`n"

    $content = $content -replace $topRegex, $topReplacement
    $content = $content -replace $bottomRegex, $bottomReplacement

    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}
