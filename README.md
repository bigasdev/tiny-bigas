# Tiny-bigas
![GitHub package.json version](https://img.shields.io/github/package-json/v/bigasdev/tiny-bigas)

Package created to help with adding pixel-art elements and buttons to my electron.js development.

It uses the canvas html element to display stuff in the screen, and with stuff such as a update() function we can add callbacks to everything.

# How to install

```
npm i tiny-bigas
```

# How to use
```js
const tinyBigas = require('tiny-bigas');
const render = require('./node_modules/tiny-bigas/bigasrender.js');

// And then, inside the preload.js 

window.addEventListener('DOMContentLoaded', () => {
    tinyBigas.exports.addButton(new tinyBigas.Button("Test", 5, [150,0], ()=>{
        console.log("I'm a button!");
    }));

    render.exports.main();
    render.exports.initialize();
});
```