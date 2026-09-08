source "https://rubygems.org"

# This is the same gem GitHub Pages itself builds with — using it locally
# means "works on my machine" actually means "works when I push it."
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

# Windows/JRuby compatibility (harmless to include even if you're not on either)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw]
