#!/bin/bash

# ============================================
# Static Site Project Setup Script
# ============================================
#
# Creates a new Eleventy static site project with the
# coding-agents submodule pre-configured.
#
# Prerequisites:
#   - Git installed
#   - GitHub SSH access configured
#
# Usage:
#   curl -sL https://raw.githubusercontent.com/genwebdevelopment/coding-agents/template-static-sites/setup-project.sh | bash -s "project-name"
#
#   Or download and run locally:
#   ./setup-project.sh "project-name"
#
# After running:
#   1. Open the project folder in VS Code
#   2. Launch Claude Code
#   3. Claude will automatically start the project setup wizard
#
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default location
DEFAULT_LOCATION="$HOME/Desktop"

# ============================================
# Helper Functions
# ============================================

print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# ============================================
# Validation
# ============================================

# Check if project name provided
if [ -z "$1" ]; then
    echo ""
    echo -e "${BLUE}Static Site Project Setup${NC}"
    echo "=========================="
    echo ""
    echo "Usage: $0 <project-name>"
    echo ""
    echo "Example:"
    echo "  $0 acme-corp-website"
    echo "  $0 \"My Client Site\""
    echo ""
    exit 1
fi

PROJECT_NAME="$1"
# Convert to slug (lowercase, hyphens)
PROJECT_SLUG=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')

# ============================================
# Ask for Project Location
# ============================================

echo ""
echo -e "${BLUE}Static Site Project Setup${NC}"
echo "=========================="
echo ""
echo "Project: $PROJECT_NAME"
echo "Folder:  $PROJECT_SLUG"
echo ""

# Ask for location
echo -e "Where would you like to create this project?"
echo -e "Default: ${YELLOW}$DEFAULT_LOCATION${NC}"
echo ""
read -p "Location (press Enter for default): " USER_LOCATION

# Use default if empty
if [ -z "$USER_LOCATION" ]; then
    PROJECT_LOCATION="$DEFAULT_LOCATION"
else
    # Expand ~ to home directory
    PROJECT_LOCATION="${USER_LOCATION/#\~/$HOME}"
fi

# Validate location exists
if [ ! -d "$PROJECT_LOCATION" ]; then
    print_error "Directory '$PROJECT_LOCATION' does not exist!"
    echo ""
    read -p "Create it? (y/n): " CREATE_DIR
    if [ "$CREATE_DIR" = "y" ] || [ "$CREATE_DIR" = "Y" ]; then
        mkdir -p "$PROJECT_LOCATION"
        print_success "Created $PROJECT_LOCATION"
    else
        echo "Exiting."
        exit 1
    fi
fi

FULL_PROJECT_PATH="$PROJECT_LOCATION/$PROJECT_SLUG"

# Check if directory already exists
if [ -d "$FULL_PROJECT_PATH" ]; then
    print_error "Directory '$FULL_PROJECT_PATH' already exists!"
    exit 1
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install git first."
    exit 1
fi

# ============================================
# Project Setup
# ============================================

echo ""
echo -e "Creating project at: ${YELLOW}$FULL_PROJECT_PATH${NC}"
echo ""

# Create project directory
print_step "Creating project directory..."
mkdir -p "$FULL_PROJECT_PATH"
cd "$FULL_PROJECT_PATH"
print_success "Created $FULL_PROJECT_PATH/"

# Initialize git
print_step "Initializing git repository..."
git init --quiet
print_success "Git initialized"

# Add .claude submodule
print_step "Adding coding-agents submodule (.claude)..."
git submodule add -b template-static-sites https://github.com/genwebdevelopment/coding-agents.git .claude

if [ $? -eq 0 ]; then
    print_success "Submodule added (.claude → template-static-sites)"
else
    print_error "Failed to add submodule. Check your GitHub access."
    exit 1
fi

# Initialize submodule
print_step "Initializing submodule..."
git submodule update --init --recursive
print_success "Submodule initialized"

# Create .gitignore
print_step "Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build output
_site/
dist/

# Environment
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/settings.json
*.swp
*.swo

# Logs
*.log
npm-debug.log*

# Cache
.cache/
.11ty-cache/
EOF
print_success "Created .gitignore"

# Create README
print_step "Creating README.md..."
cat > README.md << EOF
# $PROJECT_NAME

Static site built with Eleventy, designed for handoff to WordPress.

## Getting Started

1. Open this folder in VS Code
2. Launch Claude Code
3. Follow the setup wizard to configure your project

## Development

\`\`\`bash
npm install
npm start
\`\`\`

## Documentation

- \`docs/IMPLEMENTATION-GUIDE.md\` - Block specifications
- \`src/sitewide-sections.njk\` - Component library

---

*Created with [coding-agents](https://github.com/genwebdevelopment/coding-agents)*
EOF
print_success "Created README.md"

# Create marker file for Claude to detect new project
print_step "Creating setup marker..."
mkdir -p .claude
cat > .claude/.setup-pending << EOF
This file indicates the project needs initialization.
When Claude Code detects this file and no CLAUDE.md in root,
it will automatically offer to run /init-docs.

Delete this file after setup is complete.
EOF
print_success "Setup marker created"

# Initial commit
print_step "Creating initial commit..."
git add -A
git commit -m "Initial project setup with coding-agents submodule" --quiet
print_success "Initial commit created"

# ============================================
# Success Message
# ============================================

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Project Created Successfully!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "Location: ${YELLOW}$FULL_PROJECT_PATH${NC}"
echo ""
echo "Next steps:"
echo ""
echo -e "  1. ${BLUE}cd \"$FULL_PROJECT_PATH\"${NC}"
echo ""
echo -e "  2. Open in VS Code:"
echo -e "     ${BLUE}code .${NC}"
echo ""
echo -e "  3. Launch Claude Code (Cmd+Esc or Ctrl+Esc)"
echo ""
echo -e "  4. Claude will automatically start the setup wizard!"
echo ""
echo "============================================"
echo ""
