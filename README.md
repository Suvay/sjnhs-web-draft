# San Jose National High School Website

A modern, responsive website for San Jose National High School built with React, TypeScript, and Tailwind CSS.

## 🏫 About

This is the official website for San Jose National High School, featuring:

- **Modern Design**: Dark mode interface with responsive navigation
- **Comprehensive Information**: School history, mission, vision, and core values
- **Official Content**: DepEd Vision, Mission, and Quality Policies
- **Privacy Focused**: Placeholder content for staff and photos
- **Mobile-First**: Responsive design with hamburger menu navigation

## 🚀 Features

- **Navigation**: Full navigation system with dropdown menus
- **Dark Mode**: Permanent dark theme for better readability
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Meta tags and Open Graph support
- **Fast Loading**: Optimized build with Vite

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Routing**: Wouter (client-side routing)
- **Icons**: Lucide React

## 📁 Project Structure

```
├── client/src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utilities and configurations
├── docs/              # GitHub Pages deployment files
└── dist/              # Production build output
```

## 🚀 Deployment

### GitHub Pages

This site is configured for GitHub Pages deployment:

1. **Build the site**: `npm run build`
2. **GitHub Actions**: Automatic deployment on push to main/master
3. **Custom Domain**: Configure in repository settings if needed

The site uses:
- **Source**: GitHub Actions workflow
- **Build Output**: `docs/` directory
- **SPA Support**: 404.html for client-side routing

### Manual Deployment

1. Run `npm run build`
2. Copy `dist/public/*` to your web server
3. Configure your server for SPA routing (redirect all routes to index.html)

## 📄 Content Structure

### Pages
- **Home**: Hero section with school image, updates, staff, and gallery
- **About Us**: School history, DepEd mission/vision, core values, quality policies
- **What's New**: Activities and recent updates
- **Resources**: Forms, learning materials, and issuances
- **Updates**: Calendar, announcements, bulletin, videos
- **Contact**: Contact information and form

### Privacy Features
- All staff names replaced with "SECRET NAME"
- Positions replaced with "POSITION"
- Photos replaced with color-coded placeholder images
- Maintains visual structure while protecting privacy

## 🎨 Design System

- **Colors**: School-themed blue and yellow palette
- **Typography**: Modern, readable font stack
- **Components**: Consistent shadcn/ui component library
- **Layout**: Grid-based responsive design
- **Icons**: Lucide React icon set

## 📱 Responsive Design

- **Mobile**: Hamburger menu, stacked layouts
- **Tablet**: Adaptive grid systems
- **Desktop**: Full navigation, multi-column layouts
- **Large Screens**: Optimized for wide displays

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run check
```

## 📊 Performance

- **Fast Loading**: Optimized assets and code splitting
- **SEO Ready**: Meta tags and semantic HTML
- **Accessible**: ARIA labels and keyboard navigation
- **Progressive**: Works on all modern browsers

## 📞 Support

For technical support or content updates, please contact the developer at +63 9166037530 on Telegram.

---

**San Jose National High School** - *Soar High!*
