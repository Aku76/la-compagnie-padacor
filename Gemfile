source "https://rubygems.org"

# Utilise la dépendance méta de GitHub Pages : elle fige Jekyll et les plugins
# sur les versions exactes supportées par GitHub Pages. Aucune surprise au déploiement.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-feed"
end

# Dépendances utiles selon la plateforme (Windows / macOS / Linux).
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Note : wdm (surveillance de fichiers Windows) est volontairement omis car il ne
# compile pas sur Ruby 3.3+. Le rechargement auto reste possible via --force-polling.
gem "webrick", "~> 1.8"
