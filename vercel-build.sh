#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status
set -x  # Print commands and their arguments as they are executed

echo "Starting build process..."

# Build frontend
echo "Building frontend..."
cd client
npm install
npm run build
cd ..

# Prepare backend
echo "Preparing backend..."
cd api
npm install
# If you have any build steps for your API, add them here
# For example: npm run build
cd ..

# Copy necessary files to the deployment directory
echo "Copying files..."
mkdir -p .vercel/output
cp -r client/dist .vercel/output/static
cp -r api .vercel/output/

echo "Listing contents of .vercel/output directory:"
ls -R .vercel/output

echo "Build completed"
