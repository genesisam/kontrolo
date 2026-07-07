$files = Get-ChildItem -Path "C:\Users\Alex\Desktop\kontrolo.webflow (2)\src" -Recurse -Filter "*.astro"

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $modified = $false
    
    if ($content -match '<img\s') {
        # Calculate relative path to components
        $dir = $file.DirectoryName
        $relPath = ""
        if ($dir -match 'src\\pages\\blog') {
            $relPath = '../../components/OptimizedImage.astro'
        } elseif ($dir -match 'src\\pages\\admin') {
            $relPath = '../../components/OptimizedImage.astro'
        } elseif ($dir -match 'src\\components') {
            $relPath = './OptimizedImage.astro'
        } else {
            $relPath = '../components/OptimizedImage.astro'
        }
        
        # Inject import if not present
        if (-not ($content -match 'import OptimizedImage')) {
            # Find the first --- and insert after it
            $content = $content -replace '---', ("---`nimport OptimizedImage from '$relPath';")
        }
        
        # Replace <img with <OptimizedImage
        # But wait, there might be </img> tags? Webflow usually uses self-closing <img ... /> or <img ...>
        $content = $content -replace '<img\s', '<OptimizedImage '
        
        # Remove srcset and sizes as Astro generates them
        $content = $content -replace '(?i)\s+srcset="[^"]*"', ''
        $content = $content -replace '(?i)\s+sizes="[^"]*"', ''
        
        $modified = $true
    }
    
    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    }
}
