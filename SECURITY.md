# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | ✅ Active           |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do NOT open a public GitHub Issue for security vulnerabilities.**

### How to Report

1. Email: `security@yourdomain.com` (or your email)
2. Subject: `[SECURITY] SecureProfile - Brief Description`
3. Include: steps to reproduce, impact assessment, and any suggested fixes

I will respond within **48 hours** and aim to resolve critical issues within **7 days**.

## Security Measures Implemented

### XSS Prevention
- All user-generated content is sanitized using `textContent` (never `innerHTML` for user input)
- A `sanitize()` helper function strips HTML entities before rendering
- Form inputs are validated client-side before processing

### Content Security Policy (CSP)
Add the following headers on your server / Netlify config:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:;
```

### Input Validation
- All contact form fields are validated before submission
- Email format checked with RFC 5322-compliant regex
- No raw HTML accepted in any form field

### Netlify `_headers` file
A `_headers` file is included in this repo to enforce security headers automatically on Netlify deployments.

## Responsible Disclosure

This project follows the principle of **responsible disclosure**. If you find a bug:
- Give me time to fix it before making it public
- Don't access or modify data that doesn't belong to you
- Don't perform denial-of-service attacks

Thank you for helping keep the web safe. 🛡️
