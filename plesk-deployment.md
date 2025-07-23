# Plesk Deployment Configuration for San Jose National High School

## GitHub Repository Setup
Repository URL: https://github.com/Suvay/sjnhs-web-draft

## Plesk Configuration Settings

### Basic Settings:
- **Repository URL**: `https://github.com/Suvay/sjnhs-web-draft`
- **Repository name**: `sjnhs-web-draft`
- **Deployment mode**: Automatic (recommended)
- **Server path**: `/httpdocs`

### Additional Deployment Actions (Shell Commands):
Add these commands in the "Enable additional deployment actions" section:

```bash
# Install Node.js dependencies
npm install

# Build the React application
npm run build

# Copy built files to web directory
cp -r dist/public/* /var/www/vhosts/yourdomain.com/httpdocs/

# Copy .htaccess for proper routing
cp .htaccess /var/www/vhosts/yourdomain.com/httpdocs/
```

## Alternative Simplified Deployment Commands:
If the above doesn't work, try this simpler approach:

```bash
npm install
npm run build
cp -r dist/public/* ./
```

## Important Notes:
1. **No credentials needed** - GitHub repository is public
2. **Automatic deployment** will trigger when you push changes to GitHub
3. **Built files** will be automatically generated and deployed
4. **React routing** will work with the .htaccess file

## Troubleshooting:
- If build fails, check Node.js version in Plesk (requires Node.js 16+)
- If files don't appear, verify the copy command paths
- Check Plesk deployment logs for detailed error messages

## Post-Deployment:
Your website will be live at your domain with:
- Full React functionality
- Dark/light mode toggle
- Responsive design
- All navigation features working