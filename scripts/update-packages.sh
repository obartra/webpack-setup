
#!/bin/bash

# Remove previous package/build related data
rm -rf node_modules npm-shrinkwrap.json dist

# Run npm-check-updates and save changes
ncu -a -u

# Install + build
npm install

# Remove unneeded packages
npm prune

# Shrinkwrap all dependencies (not just build ones)
npm shrinkwrap --dev

# Run tests
npm test
