/**
 * Create seperate pages for index.html and popup.html
 * see: https://meerkat-citronella.github.io/jekyll/update/2020/10/01/welcome-to-jekyll.html#:~:text=How%20is%20this%20working%3F%20Well%2C%20when%20we%20build%20the%20React%20app%2C%20all%20these%20files%20are%20going%20to%20be%20in%20the%20build%20directory.
 */

var fs = require('fs')
fs.readFile("./build/index.html", 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/id="root"/g, 'id="popup-root"');

  fs.writeFile("./build/popup.html", result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});