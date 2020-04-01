if [ "$ENVIRONMENT" = "dev" ]; then
    nodemon
else
    tsc
    node ./dist/index.js
fi