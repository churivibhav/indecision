const path = require("path");

module.exports = {
  entry: "./src/app.jsx",
  output: {
    path: path.resolve(__dirname, "public/scripts"),
    filename: "bundle.js"
  }
};
