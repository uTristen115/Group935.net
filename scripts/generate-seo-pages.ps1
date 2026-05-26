param(
  [string]$SiteUrl = 'https://group935.net'
)

$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$indexPath = Join-Path $root 'index.html'
$sitemapPath = Join-Path $root 'sitemap.xml'
$fallbackPath = Join-Path $root '404.html'

$index = Get-Content -Raw -LiteralPath $indexPath

function Escape-Html {
  param([string]$Value)
  return [System.Security.SecurityElement]::Escape($Value)
}

function Convert-SlugTitle {
  param([string]$Slug)

  $textInfo = (Get-Culture).TextInfo
  return (($Slug -split '-') | ForEach-Object { $textInfo.ToTitleCase($_) }) -join ' '
}

function Get-RouteAssetBase {
  param([string]$Route)

  $depth = ($Route.Trim('/') -split '/' | Where-Object { $_ }).Count
  if ($depth -le 0) { return './Images' }
  return (('../' * $depth) + 'Images')
}

function Get-RouteFontBase {
  param([string]$Route)

  $depth = ($Route.Trim('/') -split '/' | Where-Object { $_ }).Count
  if ($depth -le 0) { return './Fonts' }
  return (('../' * $depth) + 'Fonts')
}

function Replace-HeadValue {
  param(
    [string]$Html,
    [string]$Pattern,
    [string]$Value
  )

  return [regex]::Replace(
    $Html,
    $Pattern,
    [System.Text.RegularExpressions.MatchEvaluator]{
      param($match)
      return $match.Groups[1].Value + $Value + $match.Groups[2].Value
    },
    1
  )
}

function Get-PublicUrl {
  param(
    [string]$Route,
    [string]$SiteUrl
  )

  $base = $SiteUrl.TrimEnd('/')
  if ($Route -eq '/') { return $base + '/' }
  return $base + $Route.TrimEnd('/') + '/'
}

function Set-StaticSeo {
  param(
    [string]$Html,
    [string]$Title,
    [string]$Description,
    [string]$Url,
    [string]$AssetBase = './Images',
    [string]$FontBase = './Fonts',
    [string]$RoutePath = ''
  )

  $titleEsc = Escape-Html $Title
  $descriptionEsc = Escape-Html $Description
  $urlEsc = Escape-Html $Url
  $assetEsc = Escape-Html $AssetBase
  $fontEsc = Escape-Html $FontBase
  $routeEsc = Escape-Html $RoutePath

  $next = [regex]::Replace($Html, '<title>.*?</title>', '<title>' + $titleEsc + '</title>', 1)
  $next = Replace-HeadValue -Html $next -Pattern '(<meta name="description" content=")[^"]*(" />)' -Value $descriptionEsc
  $next = Replace-HeadValue -Html $next -Pattern '(<link rel="canonical" href=")[^"]*(" />)' -Value $urlEsc
  $next = Replace-HeadValue -Html $next -Pattern '(<link rel="icon" type="image/png" href=")[^"]*(" />)' -Value ($assetEsc + '/Icons/Group935icon.png')
  $next = Replace-HeadValue -Html $next -Pattern '(<link rel="apple-touch-icon" href=")[^"]*(" />)' -Value ($assetEsc + '/Icons/Group935icon.png')
  $next = Replace-HeadValue -Html $next -Pattern '(<meta property="og:title" content=")[^"]*(" />)' -Value $titleEsc
  $next = Replace-HeadValue -Html $next -Pattern '(<meta property="og:description" content=")[^"]*(" />)' -Value $descriptionEsc
  $next = Replace-HeadValue -Html $next -Pattern '(<meta property="og:url" content=")[^"]*(" />)' -Value $urlEsc
  $next = Replace-HeadValue -Html $next -Pattern '(<meta name="twitter:title" content=")[^"]*(" />)' -Value $titleEsc
  $next = Replace-HeadValue -Html $next -Pattern '(<meta name="twitter:description" content=")[^"]*(" />)' -Value $descriptionEsc
  $next = Replace-HeadValue -Html $next -Pattern "(window\.G935_LOCAL_ASSET_BASE\s*=\s*')[^']*(';)" -Value $assetEsc
  $next = Replace-HeadValue -Html $next -Pattern "(window\.G935_LOCAL_FONT_BASE\s*=\s*')[^']*(';)" -Value $fontEsc
  $next = Replace-HeadValue -Html $next -Pattern "(window\.G935_ROUTE_PATH\s*=\s*')[^']*(';)" -Value $routeEsc
  return $next
}

function Get-RouteSeo {
  param(
    [string]$Route,
    [string]$SiteUrl
  )

  $url = Get-PublicUrl -Route $Route -SiteUrl $SiteUrl
  $bo7Maps = @{
    ashes = 'Ashes of the Damned'
    astra = 'Astra Malorum'
    paradox = 'Paradox Junction'
    totenreich = 'Totenreich'
  }

  if ($Route -eq '/') {
    return @{
      Title = 'Group935.net | Zombies Easter Eggs, Black Ops 7 Relic Tutorials'
      Description = 'Group935.net is a Treyarch Zombies archive with Black Ops 7 relic tutorials, map Easter egg walkthroughs, wonder weapons, perks, songs, characters, and lore.'
      Url = $url
    }
  }
  if ($Route -eq '/games') {
    return @{
      Title = 'Treyarch Zombies Games | Group 935'
      Description = 'Browse Treyarch Zombies games, maps, Easter eggs, relics, wonder weapons, perks, songs, characters, and story files.'
      Url = $url
    }
  }
  if ($Route -eq '/games/bo7') {
    return @{
      Title = 'Black Ops 7 Zombies Maps and Relics | Group 935'
      Description = 'Black Ops 7 Zombies archive for relic tutorials, map Easter eggs, characters, perks, wonder weapons, songs, and Dark Aether story files.'
      Url = $url
    }
  }
  if ($Route -eq '/maps') {
    return @{
      Title = 'Zombies Map Easter Egg Guides | Group 935'
      Description = 'Browse Treyarch Zombies map files with Easter egg notes, relic counts, map locations, image galleries, songs, and archive details.'
      Url = $url
    }
  }
  if ($Route -eq '/relics') {
    return @{
      Title = 'Black Ops 7 Relics | Effects, Trials, Tutorials | Group 935'
      Description = 'Browse Black Ops 7 Zombies relic effects, unlock requirements, portal locations, trials, and prep notes for all known relics.'
      Url = $url
    }
  }
  if ($Route -eq '/perks') {
    return @{
      Title = 'Zombies Perks and Machines | Group 935'
      Description = 'Browse Treyarch Zombies perks, machines, effects, Black Ops 7 variants, images, and archive notes.'
      Url = $url
    }
  }
  if ($Route -match '^/maps/([^/]+)$') {
    $slug = $Matches[1]
    $name = if ($bo7Maps.ContainsKey($slug)) { $bo7Maps[$slug] } else { Convert-SlugTitle $slug }
    return @{
      Title = $name + ' Zombies Easter Egg Guide | Group 935'
      Description = $name + ' map file for Black Ops 7 Zombies, including Easter egg notes, relics, location details, image gallery, songs, and archive context.'
      Url = $url
    }
  }
  if ($Route -match '^/relics/([^/]+)$') {
    $slug = $Matches[1]
    $name = if ($script:RelicNameById -and $script:RelicNameById.ContainsKey($slug)) { $script:RelicNameById[$slug] } else { Convert-SlugTitle $slug }
    return @{
      Title = $name + ' Relic Tutorial | Black Ops 7 Zombies | Group 935'
      Description = $name + ' relic tutorial for Black Ops 7 Zombies, including the effect, unlock requirements, portal, trial, save note, and prep tips.'
      Url = $url
    }
  }
  if ($Route -match '^/perks/([^/]+)$') {
    $slug = $Matches[1]
    $name = if ($script:PerkNameById -and $script:PerkNameById.ContainsKey($slug)) { $script:PerkNameById[$slug] } else { Convert-SlugTitle $slug }
    return @{
      Title = $name + ' Zombies Perk | Group 935'
      Description = $name + ' Zombies perk reference with effects, machines, images, and archive notes.'
      Url = $url
    }
  }
  if ($Route -match '^/easter-eggs/([^/]+)$') {
    $slug = $Matches[1]
    $name = if ($script:EasterEggNameById -and $script:EasterEggNameById.ContainsKey($slug)) { $script:EasterEggNameById[$slug] } else { Convert-SlugTitle $slug }
    return @{
      Title = $name + ' Easter Egg Walkthrough | Group 935'
      Description = $name + ' Zombies Easter egg walkthrough with setup notes, main quest steps, rewards, and Group 935 archive context.'
      Url = $url
    }
  }

  return @{
    Title = 'Group935.net | Zombies Easter Eggs, Black Ops 7 Relic Tutorials'
    Description = 'Group935.net is a Treyarch Zombies archive with Black Ops 7 relic tutorials, map Easter egg walkthroughs, wonder weapons, perks, songs, characters, and lore.'
    Url = $url
  }
}

function Get-BlockIds {
  param(
    [string]$Source,
    [string]$StartPattern,
    [string]$EndPattern
  )

  $match = [regex]::Match($Source, $StartPattern + '(?<block>[\s\S]*?)' + $EndPattern)
  if (-not $match.Success) { return @() }

  return [regex]::Matches($match.Groups['block'].Value, "id:\s*'([^']+)'") |
    ForEach-Object { $_.Groups[1].Value } |
    Select-Object -Unique
}

function Get-Bo7MapIds {
  param([string]$Source)

  $match = [regex]::Match($Source, 'const maps = \[(?<block>[\s\S]*?)\];\s*const characters')
  if (-not $match.Success) { return @() }

  return $match.Groups['block'].Value -split "`r?`n" |
    Where-Object { $_ -match "id:\s*'([^']+)'.*game:\s*'bo7'" } |
    ForEach-Object { $Matches[1] } |
    Select-Object -Unique
}

function Get-RelicNameMap {
  param([string]$Source)

  $names = @{}
  $match = [regex]::Match($Source, 'const relics = \[(?<block>[\s\S]*?)\];\s*bo7EasterEggs\.forEach')
  if (-not $match.Success) { return $names }

  $pattern = "id:\s*'([^']+)'.*?name:\s*([`"'])(.*?)\2"
  foreach ($item in [regex]::Matches($match.Groups['block'].Value, $pattern)) {
    $names[$item.Groups[1].Value] = $item.Groups[3].Value
  }
  return $names
}

function Get-PerkNameMap {
  param([string]$Source)

  $names = @{}
  $match = [regex]::Match($Source, 'const perkDetails = \[(?<block>[\s\S]*?)\];\s*perkDetails\.forEach')
  if (-not $match.Success) { return $names }

  $pattern = "id:\s*'([^']+)'.*?name:\s*([`"'])(.*?)\2"
  foreach ($item in [regex]::Matches($match.Groups['block'].Value, $pattern)) {
    $names[$item.Groups[1].Value] = $item.Groups[3].Value
  }
  return $names
}

function Add-EasterEggNamesFromBlock {
  param(
    [hashtable]$Names,
    [string]$Source,
    [string]$StartPattern,
    [string]$EndPattern
  )

  $match = [regex]::Match($Source, $StartPattern + '(?<block>[\s\S]*?)' + $EndPattern)
  if (-not $match.Success) { return }

  $pattern = "id:\s*'([^']+)'.*?title:\s*([`"'])(.*?)\2"
  foreach ($item in [regex]::Matches($match.Groups['block'].Value, $pattern)) {
    $Names[$item.Groups[1].Value] = $item.Groups[3].Value
  }
}

function Get-EasterEggNameMap {
  param([string]$Source)

  $names = @{}
  Add-EasterEggNamesFromBlock -Names $names -Source $Source -StartPattern 'const classicEasterEggs = \[' -EndPattern '\];\s*const bo7EasterEggs'
  Add-EasterEggNamesFromBlock -Names $names -Source $Source -StartPattern 'const bo7EasterEggs = \[' -EndPattern '\];\s*const relics'
  return $names
}

$script:RelicNameById = Get-RelicNameMap -Source $index
$script:PerkNameById = Get-PerkNameMap -Source $index
$script:EasterEggNameById = Get-EasterEggNameMap -Source $index
$relicIds = Get-BlockIds -Source $index -StartPattern 'const relics = \[' -EndPattern '\];\s*bo7EasterEggs\.forEach'
$perkIds = Get-BlockIds -Source $index -StartPattern 'const perkDetails = \[' -EndPattern '\];\s*perkDetails\.forEach'
$classicEasterEggIds = Get-BlockIds -Source $index -StartPattern 'const classicEasterEggs = \[' -EndPattern '\];\s*const bo7EasterEggs'
$bo7EasterEggIds = Get-BlockIds -Source $index -StartPattern 'const bo7EasterEggs = \[' -EndPattern '\];\s*const relics'
$bo7MapIds = Get-Bo7MapIds -Source $index

$routes = @(
  '/',
  '/games',
  '/games/bo7',
  '/maps',
  '/relics',
  '/perks'
)

$routes += $bo7MapIds | ForEach-Object { '/maps/' + $_ }
$routes += $relicIds | ForEach-Object { '/relics/' + $_ }
$routes += $perkIds | ForEach-Object { '/perks/' + $_ }
$routes += ($classicEasterEggIds + $bo7EasterEggIds) | ForEach-Object { '/easter-eggs/' + $_ }

$routes = $routes | Where-Object { $_ } | Select-Object -Unique

$fallbackSeo = Get-RouteSeo -Route '/' -SiteUrl $SiteUrl
$fallbackHtml = Set-StaticSeo -Html $index -Title $fallbackSeo.Title -Description $fallbackSeo.Description -Url $fallbackSeo.Url -AssetBase './Images' -RoutePath ''
$fallbackAssetScript = "window.G935_LOCAL_ASSET_BASE = (function () { var p = window.location.pathname.replace(/\/index\.html$/i, '/'); var depth = p.split('/').filter(Boolean).length; return depth ? '../'.repeat(depth) + 'Images' : './Images'; })();"
$fallbackHtml = $fallbackHtml.Replace("window.G935_LOCAL_ASSET_BASE = './Images';", $fallbackAssetScript)
$fallbackFontScript = "window.G935_LOCAL_FONT_BASE = (function () { var p = window.location.pathname.replace(/\/index\.html$/i, '/'); var depth = p.split('/').filter(Boolean).length; return depth ? '../'.repeat(depth) + 'Fonts' : './Fonts'; })();"
$fallbackHtml = $fallbackHtml.Replace("window.G935_LOCAL_FONT_BASE = './Fonts';", $fallbackFontScript)
Set-Content -LiteralPath $fallbackPath -Value $fallbackHtml -NoNewline

foreach ($route in $routes) {
  if ($route -eq '/') { continue }

  $relative = $route.TrimStart('/') -replace '/', [IO.Path]::DirectorySeparatorChar
  $dir = Join-Path $root $relative
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $seo = Get-RouteSeo -Route $route -SiteUrl $SiteUrl
  $routeHtml = Set-StaticSeo -Html $index -Title $seo.Title -Description $seo.Description -Url $seo.Url -AssetBase (Get-RouteAssetBase $route) -FontBase (Get-RouteFontBase $route) -RoutePath $route
  Set-Content -LiteralPath (Join-Path $dir 'index.html') -Value $routeHtml -NoNewline
}

$today = Get-Date -Format 'yyyy-MM-dd'
$sitemap = New-Object System.Text.StringBuilder
[void]$sitemap.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
[void]$sitemap.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($route in $routes) {
  $loc = Get-PublicUrl -Route $route -SiteUrl $SiteUrl
  [void]$sitemap.AppendLine('  <url>')
  [void]$sitemap.AppendLine('    <loc>' + [System.Security.SecurityElement]::Escape($loc) + '</loc>')
  [void]$sitemap.AppendLine('    <lastmod>' + $today + '</lastmod>')
  [void]$sitemap.AppendLine('    <changefreq>weekly</changefreq>')
  [void]$sitemap.AppendLine('    <priority>' + $(if ($route -eq '/') { '1.0' } elseif ($route -eq '/relics') { '0.9' } else { '0.8' }) + '</priority>')
  [void]$sitemap.AppendLine('  </url>')
}
[void]$sitemap.AppendLine('</urlset>')
Set-Content -LiteralPath $sitemapPath -Value $sitemap.ToString() -NoNewline

Write-Host "Generated $($routes.Count) sitemap routes and static entry files."
