# OptikLink Deployment Guide for San Jose National High School Website

## Overview
This guide will help you deploy your school website to OptikLink hosting.

## What You Have
- React frontend (built with Vite)
- Express.js backend (Node.js)
- PostgreSQL database support
- Static assets and images

## Deployment Options

### Option 1: Static Frontend Only (Recommended for OptikLink)
If OptikLink doesn't support Node.js, deploy just the frontend:

#### Files to Upload:
After running `npm run build`, upload contents of `dist/public/` to your OptikLink public_html folder:
- index.html
- assets/ folder (CSS, JS, images)
- All static files

#### Steps:
1. Run `npm run build` in Replit
2. Download the `dist/public/` folder
3. Upload all contents to your OptikLink `public_html` or `www` folder via File Manager or FTP
4. Your site will be live at your domain

### Option 2: Full-Stack (If OptikLink supports Node.js)
Check if OptikLink offers Node.js hosting in your plan.

#### Files Needed:
- All project files
- package.json
- Built frontend in dist/public/
- Built backend dist/index.js

## Database Setup
If using PostgreSQL features:
- Check if OptikLink provides PostgreSQL
- Create database in OptikLink control panel
- Update DATABASE_URL environment variable

## Domain Setup
1. Log into OptikLink control panel
2. Point your domain to the hosting account
3. Upload files to public_html folder
4. Test the website

## Important Notes
- The website currently works as a static site (no backend required for basic functionality)
- All enrollment links and contact information are already embedded
- Dark/light mode theme works client-side
- Navigation and all features work without backend

## Contact Information
If you need help with OptikLink-specific settings:
- Check OptikLink documentation
- Contact OptikLink support for Node.js availability
- Ensure your hosting plan supports your needs

## Files Ready for Upload
After build completion, your `dist/public/` folder contains everything needed for static hosting.