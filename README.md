# Jiarong Liang 的个人主页

极简 Jekyll 站点，**零插件、零 npm 依赖**，一个布局 + 一个 CSS 文件。
线上地址：<https://dream233.github.io>

## 目录结构

```
_config.yml                  个人信息：姓名、职位、社交链接、导航（大部分文案改这里）
_data/publications.yml       论文列表（数据）
_data/news.yml               News 列表（数据）
index.md                     首页自我介绍（Markdown）
publications.md              Publications 页（自动读取数据，一般不用动）
news.md                      News 页（同上）
cv.md                        CV 页（内嵌 PDF）
404.html                     404 页
_layouts/default.html        页面骨架：<head>、导航栏、页脚
_layouts/home.html           首页布局：头像 + 简介 + News + Selected Publications
_layouts/page.html           普通页面布局
_includes/publication-list.html   论文卡片组件
_includes/news-list.html          News 列表组件
_includes/social-icons.html       社交图标组件（内联 SVG）
assets/css/main.css          全站样式（配色/字体变量集中在文件开头的 :root）
assets/js/theme.js           明暗主题切换 + 预览图点击放大（全站唯一的 JS）
assets/img/prof_pic.jpg      头像
assets/img/publication_preview/   论文预览图
assets/pdf/cv.pdf            简历 PDF
.github/workflows/deploy.yml 部署：push 到 master → 构建 → 推到 gh-pages 分支
```

## 常见修改

| 想做什么 | 改哪里 |
| --- | --- |
| 加一篇论文 | `_data/publications.yml` 最前面复制一个条目改字段；预览图放进 `assets/img/publication_preview/` |
| 加一条 News | `_data/news.yml` 最前面加一个条目（支持 Markdown） |
| 改自我介绍 | `index.md` |
| 更新简历 | 替换 `assets/pdf/cv.pdf` |
| 改邮箱/社交链接/职位 | `_config.yml` |
| 改配色 / 字体 / 页面宽度 | `assets/css/main.css` 开头的 `:root` 变量 |
| 首页 News 显示条数 | `_config.yml` 里的 `home_news_limit` |

## 图片优化

论文预览图每张存两个尺寸（都放在 `assets/img/publication_preview/`）：

- `xxx.webp`：大图（≤1600px 宽），点击卡片缩略图放大时才加载
- `xxx-thumb.webp`：缩略图（640px 宽），卡片里显示，保证页面秒开

新增论文时用下面的命令从原图生成这两个文件（需要 Python + Pillow）：

```bash
python3 -c "
from PIL import Image
src, name = '原图.png', 'xxx'   # 改成你的文件
im = Image.open(src).convert('RGB')
for w, suf in [(1600, ''), (640, '-thumb')]:
    out = im.resize((w, round(im.height*w/im.width)), Image.LANCZOS) if im.width > w else im
    out.save(f'assets/img/publication_preview/{name}{suf}.webp', 'WEBP', quality=80, method=6)
"
```

然后在 `_data/publications.yml` 里写 `preview: xxx.webp` 和 `preview_thumb: xxx-thumb.webp`。
（偷懒也可以只放一张图、只写 `preview:`，页面能正常显示，只是加载会慢。）

## 本地预览

```bash
# 方式一：本机装了 Ruby + Jekyll（jekyll 4.x 即可）
jekyll serve          # 打开 http://localhost:4000

# 方式二：Docker，无需装 Ruby
docker run --rm -it -p 4000:4000 -v "$PWD:/srv/jekyll" jekyll/jekyll:4 jekyll serve --host 0.0.0.0
```

## 部署

push 到 `master` 分支后，GitHub Actions 会自动构建并发布到 `gh-pages` 分支
（Pages 设置里的发布源保持为 `gh-pages` 分支即可），约 1 分钟后生效。
