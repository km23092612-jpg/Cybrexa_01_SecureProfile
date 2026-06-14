# 🛡️ SecureProfile — Personal Cybersecurity Portfolio

> **Project 1 of 4 · Cybrexa Learning Track**  
> A personal portfolio website built with a cybersecurity-first mindset.

[![Live Demo](https://img.shields.io/badge/Live-Demo-00FFD1?style=flat-square&logo=netlify)](https://your-site.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Cybrexa__01__SecureProfile-181717?style=flat-square&logo=github)](https://github.com/yourusername/Cybrexa_01_SecureProfile)
[![Security](https://img.shields.io/badge/Security-XSS%20Protected-success?style=flat-square&logo=shield)](./SECURITY.md)

---

## 📸 Preview

![Homepage](images/screenshot-Home-Page.png)
![Skills Section](images/screenshot-Skills.png)
![Contact Form](images/screenshot-Contact-Section.png)
![Mobile View](images/screenshot-mobile-view.jepg)

## docs: add screenshots to README

---

## 🚀 Features

- **Animated Matrix rain** canvas background
- **Scroll-reveal animations** for all sections
- **Animated skill progress bars**
- **Contact form** with XSS-safe validation (no innerHTML on user input)
- **SECURITY.md** with responsible disclosure policy
- **Mobile responsive** across all screen sizes
- **Cybersecurity roadmap** tracker (Phase 1–5)
- **CSP-ready** with `_headers` for Netlify

---

## 🗂️ Repo Structure

```
Cybrexa_01_SecureProfile/
├── index.html          # Home + hero
├── about.html          # About & roadmap
├── skills.html         # Skills & tools
├── contact.html        # Contact form
├── style.css           # All styles
├── script.js           # JS — matrix, animations, form validation
├── images/             # Screenshots & assets
├── _headers            # Netlify security headers
├── SECURITY.md         # Vulnerability disclosure policy
└── README.md           # This file
```

---

## 🛡️ Security Highlights

| Feature | Status |
|---|---|
| XSS Prevention (textContent only) | ✅ |
| Input Validation | ✅ |
| SECURITY.md | ✅ |
| CSP Headers (Netlify) | ✅ |
| No eval() / innerHTML on user input | ✅ |

---

## ⚙️ Setup & Deployment

### Run Locally
```bash
git clone https://github.com/yourusername/Cybrexa_01_SecureProfile.git
cd Cybrexa_01_SecureProfile
# Open index.html in your browser — no build step needed
```

### Deploy to Netlify
1. Push to GitHub
2. Connect repo in [Netlify](https://netlify.com)
3. Set publish directory to `/` (root)
4. Deploy!

### Deploy to GitHub Pages
1. Go to **Settings → Pages**
2. Source: `main` branch, `/ (root)`
3. Save → Your site is live at `https://yourusername.github.io/Cybrexa_01_SecureProfile`

---

## ✅ Deliverables Checklist

- [ ] GitHub Repo: `Cybrexa_01_SecureProfile`
- [ ] Live URL (Netlify / GitHub Pages)
- [ ] 4+ Screenshots (desktop + mobile)
- [ ] 2-3 min screen recording demo for LinkedIn
- [ ] LinkedIn post mentioning @cybrexa with GitHub link

---

## 🏷️ Tech Stack

`HTML5` · `CSS3` · `Vanilla JavaScript` · `Git` · `Netlify`

---

## 📄 License

MIT © 2026 Your Name — Built as part of the [Cybrexa](https://cybrexa.in) learning track.
