# Static Website Boilerplate

Static website boilterplate built using Webpack. This boilterplate features following:

- Webpack
- ES6 (Javacsript with Babel)
- Sass
- Live reload using Browsersync

## Getting Started

JS/CSS libraries included :
- normalize-scss : CSS reset
- Susy 2 : to create columns/grids (be careful, it's not the latest v3!), ex: @include span(4 of 12);   
- breakpoint-sass : to add media queries inside css rules, ex : @include breakpoint($desktop) {}
- Font Awesome
- jQuery
- Lodash : javascript library of helpers

## To install, use NPM

Run script to install
```sh
npm install
```

## Scripts available

Run script to start development, it will open the browser http://localhost:2000/
```sh
npm run dev
```

For distribution folder run the following command and it will create a dist folder which can be placed on a server
```sh
npm run build
```

For production distribution
```sh
npm run build:prod
```

## To add a new library

Run script to install bootstrap for exemple
```sh
npm install bootstrap --save
```
"--save" will add it to package.json

then:
- import the bootstrap scss in the src/assets/scss/style.scss
- require "bootstrap" in src/js/scripts.js 

