# Plesk Full-Stack Deployment Configuration for San Jose National High School

## Overview
This guide covers full-stack deployment (frontend + backend) on Plesk with Node.js support.

## Prerequisites
- Plesk hosting with Node.js extension enabled
- Node.js version 18+ (recommended)
- MongoDB Atlas connection (already configured)
- Domain pointed to your Plesk hosting

## GitHub Repository Setup
Repository URL: https://github.com/Suvay/sjnhs-web-draft

## Plesk Node.js Application Setup

### 1. Enable Node.js Extension
1. Log into Plesk
2. Go to **Extensions** > **My Extensions**
3. Install/Enable **Node.js** extension if not already installed

### 2. Create Node.js Application
1. Go to **Domains** > **yourdomain.com** > **Node.js**
2. Click **Enable Node.js**
3. Select **Node.js version**: 18 or higher
4. **Application mode**: Production
5. **Application URL**: `httpdocs` (leave default)
6. **Application root**: `/httpdocs`
7. **Application startup file**: `server/index.ts` (but Plesk expects JS, so we'll use `dist/index.js`)

### 3. Upload Application Files
Upload all project files to `/httpdocs` directory via FTP or File Manager.

### 4. Environment Variables Setup
In Plesk Node.js settings, add these environment variables:

```
NODE_ENV=production
PORT=3000
MONGODB_CONNECTION_STRING=mongodb+srv://SJNHSDatabase:Anntwan14@cluster0.ibddjzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
DISCORD_USER_ID=your_discord_user_id_here
SESSION_SECRET=your_session_secret_here
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=your_postgresql_connection_string_if_needed
```

### 5. Build and Install Dependencies
Run these commands in Plesk Node.js console or via SSH:

```bash
# Install dependencies
npm install

# Build the application
npm run build

# The build will create dist/index.js and dist/public/ with client files
```

### 6. Start the Application
In Plesk Node.js settings:
- Click **Restart App** to start the server
- The server will run on the configured port and serve both API and client

## Alternative: Manual Deployment via SSH

If you have SSH access:

```bash
# Navigate to application directory
cd /var/www/vhosts/yourdomain.com/httpdocs

# Install dependencies
npm install

# Build application
npm run build

# Start the server (use PM2 or similar for production)
npm start
# or for production: node dist/index.js
```

## Important Notes
1. **Full-stack functionality**: Admin dashboard, content editing, user management will work
2. **MongoDB connection**: Already configured with your Atlas cluster
3. **Environment variables**: Must be set in Plesk for security
4. **Port configuration**: Server runs on port 3000 internally, Plesk proxies to port 80/443

## File Structure After Upload
```
/httpdocs/
├── server/
├── client/
├── shared/
├── package.json
├── dist/
│   ├── index.js (built server)
│   └── public/ (built client)
├── .env (with your variables)
└── ...other files
```

## Troubleshooting
- **Node.js not starting**: Check logs in Plesk > Domains > Logs
- **MongoDB connection**: Verify environment variables are set correctly
- **Build errors**: Ensure Node.js version is 18+
- **Port issues**: Check that port 3000 is available

## Post-Deployment
Your full-stack application will be live with:
- ✅ Admin dashboard with content editing
- ✅ MongoDB database connectivity
- ✅ User authentication and management
- ✅ Dynamic content updates
- ✅ Discord logging for errors/events
- ✅ Responsive React frontend
