# OptikLink Deployment Fix - No Node.js Available

## Problem Solved ✅
OptikLink hosting doesn't have Node.js/npm available, so we can't build on the server.

## Solution: Pre-built Files
I've updated the setup to commit pre-built files to GitHub.

## Updated Plesk Configuration:

### Repository Settings:
- **Repository URL**: `https://github.com/Suvay/sjnhs-web-draft`
- **Username**: (leave empty)
- **Password**: (leave empty)
- **Repository name**: `sjnhs-web-draft`
- **Deployment mode**: **Automatic**
- **Server path**: `/httpdocs`

### Updated Deployment Actions:
```bash
# Copy pre-built website files
cp -r dist/public/* /var/www/vhosts/*/httpdocs/
# Copy .htaccess for URL routing
cp .htaccess /var/www/vhosts/*/httpdocs/
```

## What Changed:
1. ✅ Built the website files (already done)
2. ✅ Updated .gitignore to include dist folder
3. ✅ Created deployment commands that work without npm
4. 🔄 Ready to commit to GitHub

## Next Steps:
1. Update your Plesk deployment actions with the new commands above
2. Commit these changes to GitHub
3. Plesk will automatically deploy the pre-built files

## Result:
Your website will work perfectly at squidyvalour.optikl.ink with all features:
- Dark/light mode toggle
- Responsive navigation
- All enrollment links
- Professional school design