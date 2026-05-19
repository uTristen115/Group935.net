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

function Get-RouteFile {
  param([string]$Route)

  if ($Route -eq '/') { return $indexPath }
  $relative = $Route.TrimStart('/') -replace '/', [IO.Path]::DirectorySeparatorChar
  return Join-Path (Join-Path $root $relative) 'index.html'
}

$runtimeAssetPattern = "window\.G935_ASSET_BASE\s*=\s*window\.location\.protocol === 'file:' \? window\.G935_LOCAL_ASSET_BASE : '/Images';"

$index = Get-Content -Raw -LiteralPath $indexPath
if ($index -notmatch "window\.G935_LOCAL_ASSET_BASE\s*=\s*'\./Images';") {
  Fail 'Root index.html does not declare the local file asset base.'
}
if ($index -notmatch $runtimeAssetPattern) {
  Fail 'Runtime asset base must use /Images on deployed pages and local relative paths for file:// pages.'
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
if (-not ($routes -contains '/maps/totenreich')) { Fail 'Sitemap is missing /maps/totenreich.' }

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

  if ($html -notmatch $runtimeAssetPattern) {
    Fail "Generated file for $route is missing the deployed /Images runtime asset base."
  }

  $canonical = $SiteUrl.TrimEnd('/') + $(if ($route -eq '/') { '/' } else { $route })
  if ($html -notmatch [regex]::Escape("<link rel=`"canonical`" href=`"$canonical`" />")) {
    Fail "Generated file for $route has the wrong canonical URL."
  }
}

$sampleFiles = @(
  'index.html',
  '404.html',
  'relics/teddy-bear/index.html',
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
  if ($html -match 'black-ops-7-relic-tutorials') {
    Fail "Sample file $sample still references the removed static relic tutorial page."
  }
}

Write-Host "SEO/local file checks passed for $($routes.Count) sitemap routes."
