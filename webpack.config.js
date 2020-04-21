module.exports = {
  mode: "production",
  entry: "./src/background.js",
  output: {
    filename: 'background.js',
    path: __dirname + '/build'
  }
}
