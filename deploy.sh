#!/bin/bash

npm run bundle
mkdir -p deploy
cp index.html deploy/index.html
cp -r dist deploy
cd deploy
git init
git checkout -b gh-pages
git remote add origin git@github.com:vieiralucas/maze-generation.git
git add . -A
git commit -m "Deploy to gh-pages"
git push origin gh-pages -f
cd ..
rm -rf deploy
