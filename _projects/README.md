# Projects

Create one Markdown file per project in this folder. Each file needs YAML front matter like this:

```yaml
---
title: "Your project title"
date: 2026-01-01
period: "2026"
description: >-
  A short description of the project and your contribution.
cover: /assets/images/covers/your-project.gif
links:
  Code: https://github.com/your-name/your-project
  Demo: https://example.com/demo
  Report: /assets/files/your-project.pdf
---
```

The `cover` field is optional. Local images and GIFs can be stored under `assets/images/covers`; local files can be stored under `assets/files`.
