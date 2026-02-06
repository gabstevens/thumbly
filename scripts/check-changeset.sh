#!/bin/bash

# 1. Identify if package code has changed in 'packages/'
# We check changes between origin/main and the current local state (HEAD)
CHANGED_FILES=$(git diff --name-only origin/main...HEAD | grep "^packages/")

if [ -z "$CHANGED_FILES" ]; then
  # No package code changed, we're good.
  exit 0
fi

# 2. Check if a NEW changeset file was added in this push
# We exclude README.md and config.json which are part of the changeset tool itself
NEW_CHANGESETS=$(git diff --name-only origin/main...HEAD | grep -E "^\.changeset/.*\.md$" | grep -v "README.md")

if [ -z "$NEW_CHANGESETS" ]; then
  echo ""
  echo "❌ Error: You modified code in 'packages/' but didn't provide a changeset."
  echo "Since these packages are published to NPM, they require documentation."
  echo "Please run 'pnpm changeset' and commit the result before pushing."
  echo ""
  exit 1
fi

echo "✅ Changeset detected for package changes. Proceeding..."
exit 0
