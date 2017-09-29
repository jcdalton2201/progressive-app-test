module.exports = {
  "globDirectory": "docs/",
  "globPatterns": [
    "**/*.{js,eot,ttf,woff,woff2,png,txt,ico,webp,gif,html,json,map,css,svg}"
  ],
  "swSrc": "src/service-worker.js",
  "swDest": "docs/service-worker.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
