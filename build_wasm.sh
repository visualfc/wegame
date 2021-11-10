#!/bin/sh
GOOS=js GOARCH=wasm go build -o mp-wasm/main.wasm --tags wx