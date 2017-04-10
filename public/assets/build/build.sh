#! /bin/bash
node r.js -o build-frontend.js
node r.js -o build-frontend-css.js
node r.js -o build-backend.js
node r.js -o build-backend-css.js
echo "done"
