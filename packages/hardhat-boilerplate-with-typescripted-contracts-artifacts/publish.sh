#!/bin/sh
# It compose build scrap into dist dir and publish with provided token and version.
# Dependency:
# - typechain lib to create javascript for package below (via `npx tsc` command)
# - already compiled contract typechain types
# - already created contract artifacts (artifacts/contracts)
#
# Example Run:
# >> export NPM_PUBLISH_TOKEN=<your secret token> && ./publish.sh

# Envs:
# - NPM_PUBLISH_TOKEN

if [ "$NPM_PUBLISH_TOKEN" = "" ]; then
  echo "Please provide 'NPM_PUBLISH_TOKEN'"
  exit 0
fi

# Flush previous versions.
rm -fr ./dist
mkdir ./dist

# Uncomment below if all typechain types of contracts needed.
echo "Copy typechain types from the root..."
cp -r ../../typechain-types ./dist/typechain-types

#echo "Copy compiled frontend-clients dist from the root..."
#cp -r ../../frontend-clients-dist/frontend-clients ./dist
#cp -r ../../frontend-clients-dist/typechain-types ./dist

echo "Copy contract artifacts (without dbg.json) from the root..."
cp -r ../../artifacts/contracts/ ./dist/contracts
find ./dist/contracts -name "*.dbg.json" -type f -delete

echo "Put token into npmrc..."
echo //registry.npmjs.org/:_authToken=${NPM_PUBLISH_TOKEN} >> .npmrc

echo "Publish package..."
npm publish --access public
