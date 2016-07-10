#!/bin/bash

./node_modules/.bin/source-map-explorer dist/app.en.*.js dist/app.*.js.map --html > dist/app-explorer.html
./node_modules/.bin/source-map-explorer dist/vendor.en.*.js dist/vendor.en.*.js.map --html > dist/vendor-explorer.html
