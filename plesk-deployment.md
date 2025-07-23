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
Since npm is not available, use these commands instead:

```bash
# Copy pre-built files from dist/public to web directory
cp -r dist/public/* /var/www/vhosts/*/httpdocs/
# Copy .htaccess for proper routing
cp .htaccess /var/www/vhosts/*/httpdocs/
```

## IMPORTANT: Pre-build Required
Since OptikLink doesn't have Node.js/npm, you must:
1. Build the project in Replit first: `npm run build`
2. Commit the built files to GitHub
3. Then Plesk will copy the pre-built files

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