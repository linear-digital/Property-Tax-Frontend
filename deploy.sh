
#!/bin/bash

# Exit immediately if any command fails
set -e

# === CONFIG ===
# === CONFIG ===
PROJECT_DIR="/home/swstaxpropertypro-afgoye/htdocs/afgoye.swstaxpropertypro.com"    # your project directory
DIST_DIR="$PROJECT_DIR/dist"            # built dist folder
TARGET_DIRS=(
    "/home/swstaxpropertypro-baidoa/htdocs/baidoa.swstaxpropertypro.com"
    "/home/swstaxpropertypro-lafoole/htdocs/lafoole.swstaxpropertypro.com"
    "/home/swstaxpropertypro-huddur/htdocs/huddur.swstaxpropertypro.com"
    "/home/swstaxpropertypro-diinsoor/htdocs/diinsoor.swstaxpropertypro.com"
    "/home/swstaxpropertypro-baraawe/htdocs/baraawe.swstaxpropertypro.com"
    "/home/swstaxpropertypro-tawakal/htdocs/tawakal.swstaxpropertypro.com"
    "/home/swstaxpropertypro-jowhar/htdocs/jowhar.swstaxpropertypro.com"
)                                       # list of destinations

# === DEPLOY ===
echo "🚀 Starting deployment..."

# Go to project
cd "$PROJECT_DIR"

# Update repo
echo "📥 Pulling latest changes..."
git pull

# Build project
echo "🏗️ Building project..."
pnpm install 
pnpm build

# Copy only the *contents* of dist/
for target in "${TARGET_DIRS[@]}"; do
    echo "📂 Deploying to $target"
    rm -rf "$target/*"
    cp -r "$DIST_DIR/"* "$target/"
done

echo "✅ Deployment finished!"