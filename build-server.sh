#!/bin/bash -e

rm -rf build |> /dev/null

mkdir -p build/server
mkdir -p build/common

cp Dockerfile build
cp server/package.json build/server
cp -r server/src build/server
cp -r src/common build/common

# cd build
# docker build . -t todo-server:1