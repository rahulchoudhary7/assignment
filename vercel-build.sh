#!/bin/bash

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
cd ..

# Copy necessary files to the deployment directory
echo "Copying files..."
mkdir -p .vercel/output
cp -r client/dist .vercel/output/static
cp -r api .vercel/output/
cp vercel.json .vercel/output/

echo "Build completed"
