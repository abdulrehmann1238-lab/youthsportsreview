# RINK REVIEW — Youth Sports Review Platform

**Know the program. Hear the community.**

A frontend demonstration of an independent youth sports review, discovery, and intelligence platform.

---

## Features

- **Program Discovery**: Search and filter youth sports organizations, academies, and clubs by sport, program type, and metro area.
- **Anonymous Community Reviews**: Verified parent reviews protected by an automatic public anonymous alias system.
- **6-Pillar Weighted Rating System**: Algorithmic weighting across Coaching Quality (25%), Player Development (25%), Communication (15%), Organization Management (15%), Safety (10%), and Overall Experience (10%).
- **Free vs. Premium Membership Experience**: Role switcher demonstrating locked reviews, weighted analytics access, and exclusive marketplace listings.
- **Organization Portal**: Claimed profile management, official replies to parent reviews, impression charts, and demographic reach analytics.
- **Sports Marketplace**: Development camps, private lessons, and equipment packages with direct inquiry modals.
- **Promotional Suite**: Location-targeted advertising simulator with live card preview and reach estimation.
- **Multi-Sport Architecture**: Built to expand across Hockey, Soccer, Basketball, Baseball, Lacrosse, and more.

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Netlify Deployment

This repository includes a `netlify.toml` pre-configured for single-page app (SPA) routing, security headers, and caching:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Redirects**: SPA rewrite `/* -> /index.html 200`
