param(
  [string]$SiteUrl = 'https://group935.net'
)

$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$indexPath = Join-Path $root 'index.html'
$dataSourcePath = Join-Path $root 'src\data.js'
$manifestPath = Join-Path $root 'dist\asset-manifest.json'
$seoDataPath = Join-Path $root 'dist\seo-data.json'
$sitemapPath = Join-Path $root 'sitemap.xml'
$fallbackPath = Join-Path $root '404.html'

$index = Get-Content -Raw -LiteralPath $indexPath
$dataSource = if (Test-Path -LiteralPath $dataSourcePath) { Get-Content -Raw -LiteralPath $dataSourcePath } else { $index }
$seoData = if (Test-Path -LiteralPath $seoDataPath) { Get-Content -Raw -LiteralPath $seoDataPath | ConvertFrom-Json } else { $null }
$script:SeoRelicsById = @{}
$script:SeoMapsById = @{}
if ($seoData -and $seoData.relics) {
  foreach ($relic in $seoData.relics) {
    if ($relic.id) { $script:SeoRelicsById[[string]$relic.id] = $relic }
  }
}
if ($seoData -and $seoData.maps) {
  foreach ($map in $seoData.maps) {
    if ($map.id) { $script:SeoMapsById[[string]$map.id] = $map }
  }
}
$dataBundleName = 'data.js'
$appBundleName = 'app.js'
if (Test-Path -LiteralPath $manifestPath) {
  $bundleManifest = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
  if ($bundleManifest.bundles -and $bundleManifest.bundles.data -and $bundleManifest.bundles.data.file) {
    $dataBundleName = [string]$bundleManifest.bundles.data.file
  }
  if ($bundleManifest.bundles -and $bundleManifest.bundles.app -and $bundleManifest.bundles.app.file) {
    $appBundleName = [string]$bundleManifest.bundles.app.file
  }
}

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

function Get-RouteAppBase {
  param([string]$Route)

  $depth = ($Route.Trim('/') -split '/' | Where-Object { $_ }).Count
  if ($depth -le 0) { return './dist' }
  return (('../' * $depth) + 'dist')
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

function Get-CanonicalRoute {
  param([string]$Route)

  if ($Route -eq '/relics') { return '/black-ops-7-relics' }
  if ($Route -match '^/relics/([^/]+)$') { return '/black-ops-7-relics/' + $Matches[1] }
  return $Route
}

function Get-RelicUrl {
  param(
    [string]$Id,
    [string]$SiteUrl
  )

  return Get-PublicUrl -Route ('/black-ops-7-relics/' + $Id) -SiteUrl $SiteUrl
}

function Get-RelicMapName {
  param($Relic)

  if ($Relic -and $Relic.mapName) { return [string]$Relic.mapName }
  if ($Relic -and $Relic.map -and $script:SeoMapsById.ContainsKey([string]$Relic.map)) { return [string]$script:SeoMapsById[[string]$Relic.map].name }
  return 'Black Ops 7'
}

function Get-RelicLabel {
  param([string]$Name)

  if ($Name -match '(?i)\brelic$') { return $Name }
  return $Name + ' Relic'
}

function Limit-Text {
  param(
    [string]$Value,
    [int]$Max = 158
  )

  $clean = ([string]$Value -replace '\s+', ' ').Trim()
  if ($clean.Length -le $Max) { return $clean }
  $trimmed = $clean.Substring(0, [Math]::Min($Max - 3, $clean.Length)).TrimEnd()
  $lastSpace = $trimmed.LastIndexOf(' ')
  if ($lastSpace -gt 70) { $trimmed = $trimmed.Substring(0, $lastSpace) }
  return $trimmed.TrimEnd() + '...'
}

function ConvertTo-JsonLd {
  param($Data)

  $json = $Data | ConvertTo-Json -Depth 16 -Compress
  return $json.Replace('<', '\u003c').Replace('>', '\u003e').Replace('&', '\u0026')
}

function Get-RouteJsonLd {
  param(
    [string]$Route,
    [string]$Title,
    [string]$Description,
    [string]$Url,
    [string]$SiteUrl
  )

  $canonicalRoute = Get-CanonicalRoute $Route
  $base = $SiteUrl.TrimEnd('/')
  $breadcrumbItems = @(
    @{ '@type' = 'ListItem'; position = 1; name = 'Group 935'; item = $base + '/' }
  )

  if ($canonicalRoute -match '^/black-ops-7-relics(?:/([^/]+))?$') {
    $breadcrumbItems += @{ '@type' = 'ListItem'; position = 2; name = 'Black Ops 7 Relics'; item = Get-PublicUrl -Route '/black-ops-7-relics' -SiteUrl $SiteUrl }
    $id = $Matches[1]
    $graph = @(
      @{
        '@type' = 'WebPage'
        '@id' = $Url + '#webpage'
        url = $Url
        name = $Title
        description = $Description
        isPartOf = @{ '@id' = $base + '/#website' }
        about = @('Black Ops 7 Zombies relics', 'BO7 relic effects', 'BO7 relic unlocks', 'Zombies relic trials')
        inLanguage = 'en-US'
      },
      @{
        '@type' = 'BreadcrumbList'
        '@id' = $Url + '#breadcrumbs'
        itemListElement = $breadcrumbItems
      }
    )

    if ($id) {
      $relic = if ($script:SeoRelicsById.ContainsKey($id)) { $script:SeoRelicsById[$id] } else { $null }
      $name = if ($relic) { [string]$relic.name } else { Convert-SlugTitle $id }
      $label = Get-RelicLabel $name
      $mapName = Get-RelicMapName $relic
      $breadcrumbItems += @{ '@type' = 'ListItem'; position = 3; name = $label; item = $Url }
      $graph[1].itemListElement = $breadcrumbItems
      $graph += @{
        '@type' = 'Article'
        '@id' = $Url + '#article'
        headline = $label + ' Tutorial'
        description = $Description
        mainEntityOfPage = @{ '@id' = $Url + '#webpage' }
        about = @('Black Ops 7 Zombies', $mapName, $label)
        keywords = @('Black Ops 7 relics', 'BO7 relics', ($label + ' guide'), ($mapName + ' relic'))
        inLanguage = 'en-US'
      }
    } else {
      $items = @()
      $position = 1
      foreach ($relic in $script:SeoRelicsById.Values | Sort-Object mapName, tier, name) {
        $label = Get-RelicLabel ([string]$relic.name)
        $items += @{
          '@type' = 'ListItem'
          position = $position
          name = $label
          description = [string]$relic.effect
          url = Get-RelicUrl -Id ([string]$relic.id) -SiteUrl $SiteUrl
        }
        $position += 1
      }
      $graph += @{
        '@type' = 'ItemList'
        '@id' = $Url + '#relic-list'
        name = 'Black Ops 7 Zombies relics'
        description = 'Black Ops 7 relic effects, unlock requirements, portal locations, trial rules, save notes, and prep tips.'
        numberOfItems = $items.Count
        itemListElement = $items
      }
    }

    return ConvertTo-JsonLd @{ '@context' = 'https://schema.org'; '@graph' = $graph }
  }

  return ConvertTo-JsonLd @{
    '@context' = 'https://schema.org'
    '@type' = 'WebPage'
    url = $Url
    name = $Title
    description = $Description
    inLanguage = 'en-US'
  }
}

function Get-StaticSeoHtml {
  param(
    [string]$Route,
    [string]$Title,
    [string]$Description,
    [string]$SiteUrl
  )

  $canonicalRoute = Get-CanonicalRoute $Route
  if ($canonicalRoute -eq '/black-ops-7-relics') {
    $items = @()
    foreach ($relic in $script:SeoRelicsById.Values | Sort-Object mapName, tier, name) {
      $href = '/black-ops-7-relics/' + [string]$relic.id + '/'
      $label = Escape-Html (Get-RelicLabel ([string]$relic.name))
      $mapName = Escape-Html (Get-RelicMapName $relic)
      $effect = Escape-Html ([string]$relic.effect)
      $items += '<li><a href="' + $href + '">' + $label + '</a> - ' + $mapName + '. ' + $effect + '</li>'
    }
    return @(
      '<h1>Black Ops 7 Zombies Relics Guide</h1>',
      '<p>All Black Ops 7 relics in the Group 935 archive, organized for players searching BO7 Zombies relic effects, unlock requirements, portal locations, trial rules, save safety, map, tier, and prep notes.</p>',
      '<p>The archive covers relics from Ashes of the Damned, Astra Malorum, Paradox Junction, and Totenreich.</p>',
      '<h2>All Black Ops 7 relics</h2>',
      '<ul>',
      ($items -join ''),
      '</ul>'
    ) -join ''
  }

  if ($canonicalRoute -match '^/black-ops-7-relics/([^/]+)$') {
    $id = $Matches[1]
    $relic = if ($script:SeoRelicsById.ContainsKey($id)) { $script:SeoRelicsById[$id] } else { $null }
    if ($relic) {
      $label = Get-RelicLabel ([string]$relic.name)
      $unlockItems = @()
      foreach ($step in @($relic.unlock)) { $unlockItems += '<li>' + (Escape-Html ([string]$step)) + '</li>' }
      $prepItems = @()
      foreach ($tip in @($relic.prep)) { $prepItems += '<li>' + (Escape-Html ([string]$tip)) + '</li>' }
      return @(
        '<h1>' + (Escape-Html ($label + ' Tutorial - Black Ops 7 Zombies')) + '</h1>',
        '<p>' + (Escape-Html ([string]$relic.effect)) + '</p>',
        '<p><strong>Map:</strong> ' + (Escape-Html (Get-RelicMapName $relic)) + ' | <strong>Tier:</strong> ' + (Escape-Html ([string]$relic.tier)) + ' | <strong>Difficulty:</strong> ' + (Escape-Html ([string]$relic.difficulty)) + '</p>',
        '<p><strong>Portal:</strong> ' + (Escape-Html ([string]$relic.portal)) + '</p>',
        '<p><strong>Save note:</strong> ' + (Escape-Html ([string]$relic.save)) + '</p>',
        '<h2>Unlock requirements</h2>',
        '<ol>' + ($unlockItems -join '') + '</ol>',
        '<h2>Trial rules and prep</h2>',
        '<p>' + (Escape-Html ([string]$relic.trial)) + '</p>',
        '<ul>' + ($prepItems -join '') + '</ul>',
        '<p><a href="/black-ops-7-relics/">Back to all Black Ops 7 relics</a></p>'
      ) -join ''
    }
  }

  return '<h1>' + (Escape-Html $Title) + '</h1><p>' + (Escape-Html $Description) + '</p>'
}

function Set-StaticSeo {
  param(
    [string]$Html,
    [string]$Title,
    [string]$Description,
    [string]$Url,
    [string]$AssetBase = './Images',
    [string]$FontBase = './Fonts',
    [string]$AppBase = './dist',
    [string]$DataBundle = 'data.js',
    [string]$AppBundle = 'app.js',
    [string]$RoutePath = '',
    [string]$SiteUrl = 'https://group935.net'
  )

  $titleEsc = Escape-Html $Title
  $descriptionEsc = Escape-Html $Description
  $urlEsc = Escape-Html $Url
  $assetEsc = Escape-Html $AssetBase
  $fontEsc = Escape-Html $FontBase
  $appEsc = Escape-Html $AppBase
  $dataBundleEsc = Escape-Html $DataBundle
  $appBundleEsc = Escape-Html $AppBundle
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
  $next = Replace-HeadValue -Html $next -Pattern "(window\.G935_LOCAL_APP_BASE\s*=\s*')[^']*(';)" -Value $appEsc
  $next = Replace-HeadValue -Html $next -Pattern "(window\.G935_DATA_BUNDLE\s*=\s*')[^']*(';)" -Value $dataBundleEsc
  $next = Replace-HeadValue -Html $next -Pattern "(window\.G935_APP_BUNDLE\s*=\s*')[^']*(';)" -Value $appBundleEsc
  $next = Replace-HeadValue -Html $next -Pattern "(window\.G935_ROUTE_PATH\s*=\s*')[^']*(';)" -Value $routeEsc
  $routeForSeo = if ($RoutePath) { $RoutePath } else { '/' }
  $jsonLd = Get-RouteJsonLd -Route $routeForSeo -Title $Title -Description $Description -Url $Url -SiteUrl $SiteUrl
  $jsonLdTag = '<script id="pap-route-jsonld" type="application/ld+json">' + $jsonLd + '</script>'
  if ($next -match '<script id="pap-route-jsonld" type="application/ld\+json">[\s\S]*?</script>') {
    $next = [regex]::Replace($next, '<script id="pap-route-jsonld" type="application/ld\+json">[\s\S]*?</script>', $jsonLdTag, 1)
  } else {
    $next = $next.Replace('</head>', $jsonLdTag + "`r`n</head>")
  }
  $staticHtml = Get-StaticSeoHtml -Route $routeForSeo -Title $Title -Description $Description -SiteUrl $SiteUrl
  $staticBlock = '<main id="seo-static-content" class="seo-static-content">' + $staticHtml + '</main>'
  $next = [regex]::Replace($next, '<main id="seo-static-content" class="seo-static-content">[\s\S]*?</main>', $staticBlock, 1)
  return $next
}

function Get-RouteSeo {
  param(
    [string]$Route,
    [string]$SiteUrl
  )

  $canonicalRoute = Get-CanonicalRoute $Route
  $url = Get-PublicUrl -Route $canonicalRoute -SiteUrl $SiteUrl
  $bo7Maps = @{
    ashes = 'Ashes of the Damned'
    astra = 'Astra Malorum'
    paradox = 'Paradox Junction'
    totenreich = 'Totenreich'
  }

  if ($canonicalRoute -eq '/') {
    return @{
      Title = 'Group935.net | Zombies Easter Eggs, Black Ops 7 Relic Tutorials'
      Description = 'Group935.net is a Treyarch Zombies archive with Black Ops 7 relic tutorials, map Easter egg walkthroughs, wonder weapons, perks, songs, characters, and lore.'
      Url = $url
    }
  }
  if ($canonicalRoute -eq '/games') {
    return @{
      Title = 'Treyarch Zombies Games | Group 935'
      Description = 'Browse Treyarch Zombies games, maps, Easter eggs, relics, wonder weapons, perks, songs, characters, and story files.'
      Url = $url
    }
  }
  if ($canonicalRoute -eq '/games/bo7') {
    return @{
      Title = 'Black Ops 7 Zombies Maps and Relics | Group 935'
      Description = 'Black Ops 7 Zombies archive for relic tutorials, map Easter eggs, characters, perks, wonder weapons, songs, and Dark Aether story files.'
      Url = $url
    }
  }
  if ($canonicalRoute -eq '/maps') {
    return @{
      Title = 'Zombies Map Easter Egg Guides | Group 935'
      Description = 'Browse Treyarch Zombies map files with Easter egg notes, relic counts, map locations, image galleries, songs, and archive details.'
      Url = $url
    }
  }
  if ($canonicalRoute -eq '/black-ops-7-relics') {
    return @{
      Title = 'Black Ops 7 Relics Guide | Effects, Unlocks, Trials | Group 935'
      Description = 'All Black Ops 7 Zombies relics with effects, unlock steps, portal locations, trial rules, save safety, map, tier, and prep notes.'
      Url = $url
    }
  }
  if ($canonicalRoute -eq '/perks') {
    return @{
      Title = 'Zombies Perks and Machines | Group 935'
      Description = 'Browse Treyarch Zombies perks, machines, effects, Black Ops 7 variants, images, and archive notes.'
      Url = $url
    }
  }
  if ($canonicalRoute -match '^/maps/([^/]+)$') {
    $slug = $Matches[1]
    $name = if ($bo7Maps.ContainsKey($slug)) { $bo7Maps[$slug] } else { Convert-SlugTitle $slug }
    return @{
      Title = $name + ' Zombies Easter Egg Guide | Group 935'
      Description = $name + ' map file for Black Ops 7 Zombies, including Easter egg notes, relics, location details, image gallery, songs, and archive context.'
      Url = $url
    }
  }
  if ($canonicalRoute -match '^/black-ops-7-relics/([^/]+)$') {
    $slug = $Matches[1]
    $name = if ($script:RelicNameById -and $script:RelicNameById.ContainsKey($slug)) { $script:RelicNameById[$slug] } else { Convert-SlugTitle $slug }
    $relic = if ($script:SeoRelicsById.ContainsKey($slug)) { $script:SeoRelicsById[$slug] } else { $null }
    $mapName = Get-RelicMapName $relic
    $effect = if ($relic -and $relic.effect) { [string]$relic.effect } else { '' }
    $label = Get-RelicLabel $name
    return @{
      Title = $label + ' Guide | BO7 Zombies Unlocks, Trial | Group 935'
      Description = $label + ' Black Ops 7 Zombies guide for ' + $mapName + ' with effect, unlock requirements, portal location, trial rules, save note, and prep tips.'
      Url = $url
    }
  }
  if ($canonicalRoute -match '^/perks/([^/]+)$') {
    $slug = $Matches[1]
    $name = if ($script:PerkNameById -and $script:PerkNameById.ContainsKey($slug)) { $script:PerkNameById[$slug] } else { Convert-SlugTitle $slug }
    return @{
      Title = $name + ' Zombies Perk | Group 935'
      Description = $name + ' Zombies perk reference with effects, machines, images, and archive notes.'
      Url = $url
    }
  }
  if ($canonicalRoute -match '^/easter-eggs/([^/]+)$') {
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

$script:RelicNameById = Get-RelicNameMap -Source $dataSource
$script:PerkNameById = Get-PerkNameMap -Source $dataSource
$script:EasterEggNameById = Get-EasterEggNameMap -Source $dataSource
$relicIds = Get-BlockIds -Source $dataSource -StartPattern 'const relics = \[' -EndPattern '\];\s*bo7EasterEggs\.forEach'
$perkIds = Get-BlockIds -Source $dataSource -StartPattern 'const perkDetails = \[' -EndPattern '\];\s*perkDetails\.forEach'
$classicEasterEggIds = Get-BlockIds -Source $dataSource -StartPattern 'const classicEasterEggs = \[' -EndPattern '\];\s*const bo7EasterEggs'
$bo7EasterEggIds = Get-BlockIds -Source $dataSource -StartPattern 'const bo7EasterEggs = \[' -EndPattern '\];\s*const relics'
$bo7MapIds = Get-Bo7MapIds -Source $dataSource

$routes = @(
  '/',
  '/games',
  '/games/bo7',
  '/maps',
  '/relics',
  '/black-ops-7-relics',
  '/perks'
)

$routes += $bo7MapIds | ForEach-Object { '/maps/' + $_ }
$routes += $relicIds | ForEach-Object { '/relics/' + $_ }
$routes += $relicIds | ForEach-Object { '/black-ops-7-relics/' + $_ }
$routes += $perkIds | ForEach-Object { '/perks/' + $_ }
$routes += ($classicEasterEggIds + $bo7EasterEggIds) | ForEach-Object { '/easter-eggs/' + $_ }

$routes = $routes | Where-Object { $_ } | Select-Object -Unique
$sitemapRoutes = $routes | Where-Object { $_ -notmatch '^/relics(/|$)' }

$rootSeo = Get-RouteSeo -Route '/' -SiteUrl $SiteUrl
$rootHtml = Set-StaticSeo -Html $index -Title $rootSeo.Title -Description $rootSeo.Description -Url $rootSeo.Url -AssetBase './Images' -FontBase './Fonts' -AppBase './dist' -DataBundle $dataBundleName -AppBundle $appBundleName -RoutePath '' -SiteUrl $SiteUrl
Set-Content -LiteralPath $indexPath -Value $rootHtml -NoNewline

$fallbackSeo = Get-RouteSeo -Route '/' -SiteUrl $SiteUrl
$fallbackHtml = Set-StaticSeo -Html $index -Title $fallbackSeo.Title -Description $fallbackSeo.Description -Url $fallbackSeo.Url -AssetBase './Images' -FontBase './Fonts' -AppBase './dist' -DataBundle $dataBundleName -AppBundle $appBundleName -RoutePath '' -SiteUrl $SiteUrl
$fallbackAssetScript = "window.G935_LOCAL_ASSET_BASE = (function () { var p = window.location.pathname.replace(/\/index\.html$/i, '/'); var depth = p.split('/').filter(Boolean).length; return depth ? '../'.repeat(depth) + 'Images' : './Images'; })();"
$fallbackHtml = $fallbackHtml.Replace("window.G935_LOCAL_ASSET_BASE = './Images';", $fallbackAssetScript)
$fallbackFontScript = "window.G935_LOCAL_FONT_BASE = (function () { var p = window.location.pathname.replace(/\/index\.html$/i, '/'); var depth = p.split('/').filter(Boolean).length; return depth ? '../'.repeat(depth) + 'Fonts' : './Fonts'; })();"
$fallbackHtml = $fallbackHtml.Replace("window.G935_LOCAL_FONT_BASE = './Fonts';", $fallbackFontScript)
$fallbackAppScript = "window.G935_LOCAL_APP_BASE = (function () { var p = window.location.pathname.replace(/\/index\.html$/i, '/'); var depth = p.split('/').filter(Boolean).length; return depth ? '../'.repeat(depth) + 'dist' : './dist'; })();"
$fallbackHtml = $fallbackHtml.Replace("window.G935_LOCAL_APP_BASE = './dist';", $fallbackAppScript)
Set-Content -LiteralPath $fallbackPath -Value $fallbackHtml -NoNewline

foreach ($route in $routes) {
  if ($route -eq '/') { continue }

  $relative = $route.TrimStart('/') -replace '/', [IO.Path]::DirectorySeparatorChar
  $dir = Join-Path $root $relative
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $seo = Get-RouteSeo -Route $route -SiteUrl $SiteUrl
  $routeHtml = Set-StaticSeo -Html $index -Title $seo.Title -Description $seo.Description -Url $seo.Url -AssetBase (Get-RouteAssetBase $route) -FontBase (Get-RouteFontBase $route) -AppBase (Get-RouteAppBase $route) -DataBundle $dataBundleName -AppBundle $appBundleName -RoutePath $route -SiteUrl $SiteUrl
  Set-Content -LiteralPath (Join-Path $dir 'index.html') -Value $routeHtml -NoNewline
}

$today = Get-Date -Format 'yyyy-MM-dd'
$sitemap = New-Object System.Text.StringBuilder
[void]$sitemap.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
[void]$sitemap.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($route in $sitemapRoutes) {
  $loc = Get-PublicUrl -Route $route -SiteUrl $SiteUrl
  [void]$sitemap.AppendLine('  <url>')
  [void]$sitemap.AppendLine('    <loc>' + [System.Security.SecurityElement]::Escape($loc) + '</loc>')
  [void]$sitemap.AppendLine('    <lastmod>' + $today + '</lastmod>')
  [void]$sitemap.AppendLine('    <changefreq>weekly</changefreq>')
  [void]$sitemap.AppendLine('    <priority>' + $(if ($route -eq '/') { '1.0' } elseif ($route -eq '/black-ops-7-relics') { '0.95' } elseif ($route -match '^/black-ops-7-relics/') { '0.85' } else { '0.8' }) + '</priority>')
  [void]$sitemap.AppendLine('  </url>')
}
[void]$sitemap.AppendLine('</urlset>')
Set-Content -LiteralPath $sitemapPath -Value $sitemap.ToString() -NoNewline

Write-Host "Generated $($routes.Count) static entry files and $($sitemapRoutes.Count) sitemap routes."
