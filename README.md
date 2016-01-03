reticle.js
==========

Reticle.js is a web browser bookmarklet that will overlay a full-page crosshair/reticle (that follows your mouse pointer) on whatever page you are on. This is useful for precisely aligning content on web pages as you are designing and editing them. 

After activating the reticle, move your mouse around to position it, and press the `f` or `F` key to freeze or unfreeze the reticle so you can edit the page elements using the reticle as a fixed alignment guide. When frozen, you can nudge the reticle up (`w` or `W` key), down (`s` or `S` key), left (`a` or `A` key), or right (`d` or `D` key) by a single pixel for precise alignment. Disable or enable the reticle after you have enabled by using the `q` or `Q` keys.

The original non-minified Javascript source code is in `src/reticle.js`, and a pre-built HTML page with the embedded bookmarklet (with minfied JS) is in the file `dist/index.html`. 

## How to modify the Reticle.js source and build the bookmarklet

Modifying and building Reticle.js requires [Node.js](https://nodejs.org/) (version 0.10 or later). 

1. After ensuring you have Node.js installed, go to the directory for Reticle.js and install the build dependencies: `> npm install`
2. Make changes the javascript source code for the bookmarklet in `src/reticle.js`
    * NOTE: Be sure to use only double quotes for string literals in this file (and escape single quotes within those), since the the injected bookmarklet JS code will be wrapped in single quotes in an anchor tag the HTML template page.
3. Make changes to the HTML page template that will link to the bookmarklet in `template/index.html`
4. Build the Bookmarklet HTML page: `> npm start` (this will automatically launch the gulp script to minify and inject the minified JS into an anchor tag in the HTML template)
5. The resulting updated Bookmarklet HTML page will be output to `dist/index.html`


## Get the Bookmarklet from the Demo Page
Go Here and Drag the Link to your Toolbar: http://skorupski.org/reticlejs
