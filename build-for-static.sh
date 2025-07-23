#!/bin/bash
# Build script for static hosting deployment

echo "Building San Jose National High School website for static hosting..."

# Install dependencies
npm install

# Build the application
npm run build

# Copy built files to root for easy deployment
cp -r dist/public/* ./

# Copy .htaccess for Apache servers
cp .htaccess ./

echo "Build complete! Files ready for static hosting."
echo "Upload all files from dist/public/ to your web server."