#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
echo 'docs.kuberlogic.com' > CNAME

git config --global user.email "jdaveyan@cloudlinux.com"
git config --global user.name "jdaveyan"

git init
git add -A
git commit -m 'deploy [skip ci]'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:cloudlinux/kuberlogic-doc.git master:gh-pages

cd -