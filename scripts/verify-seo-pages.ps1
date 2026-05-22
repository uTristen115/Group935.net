param(
  [string]$SiteUrl = 'https://group935.net'
)

$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$indexPath = Join-Path $root 'index.html'
$sitemapPath = Join-Path $root 'sitemap.xml'

function Fail {
  param([string]$Message)
  throw $Message
}

function Get-ExpectedAssetBase {
  param([string]$Route)

  $depth = ($Route.Trim('/') -split '/' | Where-Object { $_ }).Count
  if ($depth -le 0) { return './Images' }
  return (('../' * $depth) + 'Images')
}

function Get-ExpectedFontBase {
  param([string]$Route)

  $depth = ($Route.Trim('/') -split '/' | Where-Object { $_ }).Count
  if ($depth -le 0) { return './Fonts' }
  return (('../' * $depth) + 'Fonts')
}

function Get-RouteFile {
  param([string]$Route)

  if ($Route -eq '/') { return $indexPath }
  $relative = $Route.TrimStart('/') -replace '/', [IO.Path]::DirectorySeparatorChar
  return Join-Path (Join-Path $root $relative) 'index.html'
}

$runtimeAssetPattern = "window\.G935_ASSET_BASE\s*=\s*window\.location\.protocol === 'file:' \? window\.G935_LOCAL_ASSET_BASE : '/Images';"
$runtimeFontPattern = "window\.G935_FONT_BASE\s*=\s*window\.location\.protocol === 'file:' \? window\.G935_LOCAL_FONT_BASE : '/Fonts';"
$gaMeasurementId = 'G-7Q90XFJQFF'
$oldAstraSlug = 'ast' + 'ro'
$oldAstraRoute = '/maps/' + $oldAstraSlug
$oldAstraPattern = '\b' + $oldAstraSlug + '\b|Ast' + 'ro Malorum|' + [regex]::Escape($oldAstraRoute)

$index = Get-Content -Raw -LiteralPath $indexPath
if ($index -notmatch "window\.G935_LOCAL_ASSET_BASE\s*=\s*'\./Images';") {
  Fail 'Root index.html does not declare the local file asset base.'
}
if ($index -notmatch "window\.G935_LOCAL_FONT_BASE\s*=\s*'\./Fonts';") {
  Fail 'Root index.html does not declare the local file font base.'
}
if ($index -notmatch $runtimeAssetPattern) {
  Fail 'Runtime asset base must use /Images on deployed pages and local relative paths for file:// pages.'
}
if ($index -notmatch $runtimeFontPattern) {
  Fail 'Runtime font base must use /Fonts on deployed pages and local relative paths for file:// pages.'
}
if ($index -notmatch [regex]::Escape("https://www.googletagmanager.com/gtag/js?id=$gaMeasurementId")) {
  Fail 'Root index.html is missing the Google Analytics tag.'
}
if ($index -notmatch [regex]::Escape("window.G935_GA_MEASUREMENT_ID = '$gaMeasurementId';")) {
  Fail 'Root index.html is missing the configured GA4 measurement ID.'
}
if ($index -notmatch "G935_ANALYTICS_ENABLED\s*=\s*window\.location\.protocol === 'https:'") {
  Fail 'Analytics must be limited to live HTTPS pages.'
}
if ($index -notmatch "send_page_view:\s*false") {
  Fail 'Analytics config must disable automatic page_view events so app route tracking controls page views.'
}
if ($index -notmatch 'analyticsTrackPageView\(route\)') {
  Fail 'App route changes are not wired to analytics page view tracking.'
}
if ($index -notmatch 'url\("\$\{FONT_BASE\}/Help%20Scratch%20Writing/help-me/HelpMe\.ttf"\)') {
  Fail 'HelpMe scratch font does not use the route-aware font base.'
}
if ($index -notmatch "window\.G935_ROUTE_PATH\s*=\s*'';") {
  Fail 'Root index.html should not force a route path.'
}
if ($index -notmatch "window\.location\.protocol === 'file:'") {
  Fail 'Router is missing the local file:// navigation branch.'
}
if ($index -notmatch "window\.history\.pushState") {
  Fail 'Router is missing the clean URL pushState branch for deployed pages.'
}

$xml = [xml](Get-Content -Raw -LiteralPath $sitemapPath)
$routes = @()
foreach ($url in $xml.urlset.url) {
  $uri = [uri]$url.loc
  if ($uri.Host -ne ([uri]$SiteUrl).Host) {
    Fail "Unexpected sitemap host: $($url.loc)"
  }
  $route = $uri.AbsolutePath
  if ([string]::IsNullOrWhiteSpace($route)) { $route = '/' }
  $routes += $route
}

if (-not ($routes -contains '/relics')) { Fail 'Sitemap is missing /relics.' }
if (-not ($routes -contains '/relics/teddy-bear')) { Fail 'Sitemap is missing /relics/teddy-bear.' }
if (-not ($routes -contains '/perks')) { Fail 'Sitemap is missing /perks.' }
if (-not ($routes -contains '/perks/wisp-tea')) { Fail 'Sitemap is missing /perks/wisp-tea.' }
if (-not ($routes -contains '/easter-eggs/totenreich-main-quest')) { Fail 'Sitemap is missing /easter-eggs/totenreich-main-quest.' }
if (-not ($routes -contains '/easter-eggs/moon-big-bang-theory')) { Fail 'Sitemap is missing /easter-eggs/moon-big-bang-theory.' }
if (-not ($routes -contains '/maps/astra')) { Fail 'Sitemap is missing /maps/astra.' }
if (-not ($routes -contains '/maps/totenreich')) { Fail 'Sitemap is missing /maps/totenreich.' }
if ($routes -contains $oldAstraRoute) { Fail 'Sitemap still contains the old Astra route.' }

$oldAstraFile = Join-Path (Join-Path $root ('maps\' + $oldAstraSlug)) 'index.html'
if (Test-Path -LiteralPath $oldAstraFile) {
  Fail 'Old generated Astra route file still exists.'
}

foreach ($route in $routes) {
  $file = Get-RouteFile $route
  if (-not (Test-Path -LiteralPath $file)) {
    Fail "Missing generated route file for $route at $file"
  }

  $html = Get-Content -Raw -LiteralPath $file
  if ($route -ne '/') {
    $routePattern = [regex]::Escape("window.G935_ROUTE_PATH = '$route';")
    if ($html -notmatch $routePattern) {
      Fail "Generated file for $route is missing its route hint."
    }
  }

  $expectedAssetBase = Get-ExpectedAssetBase $route
  $assetPattern = [regex]::Escape("window.G935_LOCAL_ASSET_BASE = '$expectedAssetBase';")
  if ($route -ne '/' -and $html -notmatch $assetPattern) {
    Fail "Generated file for $route has the wrong local asset base. Expected $expectedAssetBase."
  }

  $expectedFontBase = Get-ExpectedFontBase $route
  $fontPattern = [regex]::Escape("window.G935_LOCAL_FONT_BASE = '$expectedFontBase';")
  if ($route -ne '/' -and $html -notmatch $fontPattern) {
    Fail "Generated file for $route has the wrong local font base. Expected $expectedFontBase."
  }

  if ($html -notmatch $runtimeAssetPattern) {
    Fail "Generated file for $route is missing the deployed /Images runtime asset base."
  }
  if ($html -notmatch $runtimeFontPattern) {
    Fail "Generated file for $route is missing the deployed /Fonts runtime font base."
  }
  if ($html -notmatch [regex]::Escape("window.G935_GA_MEASUREMENT_ID = '$gaMeasurementId';")) {
    Fail "Generated file for $route is missing the GA4 measurement ID."
  }
  if ($html -notmatch 'analyticsTrackPageView\(route\)') {
    Fail "Generated file for $route is missing app route analytics tracking."
  }

  $canonical = $SiteUrl.TrimEnd('/') + $(if ($route -eq '/') { '/' } else { $route })
  if ($html -notmatch [regex]::Escape("<link rel=`"canonical`" href=`"$canonical`" />")) {
    Fail "Generated file for $route has the wrong canonical URL."
  }
  if ($html -match $oldAstraPattern) {
    Fail "Generated file for $route still references the old Astra map spelling or route."
  }
}

$sampleFiles = @(
  'index.html',
  '404.html',
  'relics/teddy-bear/index.html',
  'easter-eggs/totenreich-main-quest/index.html',
  'easter-eggs/moon-big-bang-theory/index.html',
  'maps/astra/index.html',
  'maps/totenreich/index.html',
  'games/bo7/index.html'
)

foreach ($sample in $sampleFiles) {
  $file = Join-Path $root ($sample -replace '/', [IO.Path]::DirectorySeparatorChar)
  if (-not (Test-Path -LiteralPath $file)) { Fail "Missing sample file $sample." }
  $html = Get-Content -Raw -LiteralPath $file
  if ($html -match 'src="/Images|href="/Images|url\("/Images|const IMG_BASE = ''/Images''') {
    Fail "Sample file $sample contains a root-absolute local image path."
  }
  if ($html -match 'url\("\./Fonts/') {
    Fail "Sample file $sample contains a hardcoded relative font path."
  }
  if ($html -match 'black-ops-7-relic-tutorials') {
    Fail "Sample file $sample still references the removed static relic tutorial page."
  }
}

$wispFile = Join-Path $root 'perks\wisp-tea\index.html'
if (-not (Test-Path -LiteralPath $wispFile)) { Fail 'Missing generated Wisp Tea route file.' }
$wispHtml = Get-Content -Raw -LiteralPath $wispFile
if ($wispHtml -notmatch 'Wisp Tea') { Fail 'Wisp Tea is missing from the generated perk page.' }
if ($wispHtml -notmatch "dir:\s*'wisp-tea'" -or $wispHtml -notmatch "hero:\s*'WispTea\.png'") {
  Fail 'Wisp Tea generated page does not reference the WispTea image.'
}

$totenreichEeFile = Join-Path $root 'easter-eggs\totenreich-main-quest\index.html'
if (-not (Test-Path -LiteralPath $totenreichEeFile)) { Fail 'Missing generated Totenreich Easter egg route file.' }
$totenreichEeHtml = Get-Content -Raw -LiteralPath $totenreichEeFile
if ($totenreichEeHtml -notmatch 'Images Coming Soon') { Fail 'Totenreich Easter egg page is missing the construction tape image placeholder.' }
if ($totenreichEeHtml -notmatch 'Build the Jotun Star') { Fail 'Totenreich Easter egg page is missing the rewritten step data.' }

$moonEeFile = Join-Path $root 'easter-eggs\moon-big-bang-theory\index.html'
if (-not (Test-Path -LiteralPath $moonEeFile)) { Fail 'Missing generated Moon Easter egg route file.' }
$moonEeHtml = Get-Content -Raw -LiteralPath $moonEeFile
if ($moonEeHtml -notmatch 'Cryogenic Slumber Party / Big Bang Theory') { Fail 'Moon Easter egg page is missing the starter step data.' }
if ($moonEeHtml -notmatch 'knockvrilsphereoffsatellite\.gif' -or $moonEeHtml -notmatch 'eeending\.gif') {
  Fail 'Moon Easter egg page does not reference the new Moon gif assets.'
}

Write-Host "SEO/local file checks passed for $($routes.Count) sitemap routes."
