// webpack.config.js

module.exports = {
    // Other webpack configuration options...
    resolve: {
      fallback: {
        "stream": false,
        "path": false,
        "dgram": false,
        "net": false,
        "fs": false,
        "os": false,
        "timers": false,
        "zlib": false,
        "crypto": false,
        "http": false
      }
    }
  };
  