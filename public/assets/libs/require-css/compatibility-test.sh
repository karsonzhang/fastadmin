#!/bin/bash

# To cover all possible use case, you should change `optimizeCss` in `example/build.js` from "none" to
# optimizeCss: "standard.keepLines"
# optimizeCss: "standard.keepWhitespace"
# optimizeCss: "standard.keepComments"
# optimizeCss: "standard.keepComments.keepLines"
# optimizeCss: "standard.keepLines.keepWhitespace" - default by r.js

(
  npm install requirejs@2.1.10 -g

  npm install csso@1.3.12 -g
  r.js -o example/build.js

  npm install csso@1.4.0 -g
  r.js -o example/build.js

  npm install csso@1.8.0 -g
  r.js -o example/build.js

  npm install csso@2.0.0 -g
  r.js -o example/build.js

  npm install csso@latest -g
  r.js -o example/build.js

  # RequireJS@latest

  npm install requirejs@latest -g

  npm install csso@1.3.12 -g
  r.js -o example/build.js

  npm install csso@1.4.0 -g
  r.js -o example/build.js

  npm install csso@1.8.0 -g
  r.js -o example/build.js

  npm install csso@2.0.0 -g
  r.js -o example/build.js

  npm install csso@latest -g
  r.js -o example/build.js
) > compatibility.log
