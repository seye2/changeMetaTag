#!/bin/sh

rm -rf functions/view/*
cp index.js functions/view
cp package.json functions/view
cp project.json functions/view
cp -R node_modules functions/view

apex deploy