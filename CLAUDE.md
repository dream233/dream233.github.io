# Personal academic homepage (minimal Jekyll)

Hand-rolled minimal Jekyll site (no plugins, no npm). Deployed via GitHub Actions to the `gh-pages` branch on push to `master`.

- Content lives in data files: `_data/publications.yml` (papers), `_data/news.yml` (news), `index.md` (bio). Personal info, nav, and social links are in `_config.yml`.
- Presentation: 3 layouts in `_layouts/`, 3 components in `_includes/`, one stylesheet `assets/css/main.css` (design tokens in `:root` at the top, light + dark themes), one script `assets/js/theme.js` (theme toggle + preview lightbox).
- Fonts are self-hosted Latin subsets in `assets/fonts/`. Only the heading font is preloaded in `default.html`: preloading both slowed first paint on slow connections. Don't add Google Fonts or any other third-party request: render-blocking external CSS leaves the page blank for visitors in mainland China.
- Page front matter: `subtitle` is the visible line under the title; `description` is only the SEO meta description.
- Build/preview: `jekyll build` / `jekyll serve` (Jekyll 4.x, no bundler needed locally).
- Keep it simple: no new plugins or JS dependencies unless the user asks. When adding a publication, copy an existing entry in `_data/publications.yml` — see the comment header there for field meanings.
