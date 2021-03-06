const liveServer = require('live-server');
const ip = require('ip');

const params = {
  port: 3000, // Set the server port. Defaults to 8080.
  host: ip.address(), // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: '', // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  ignore: 'scss,my/templates', // comma-separated string for paths to ignore
  watchDotfiles: true, // watch dotfiles, rather than ignoring them
  file: 'index.html', // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  mount: [['/components', './node_modules']], // Mount a directory to a route.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots, 3 = everything
  middleware: [
    function (req, res, next) {
      next();
    },
  ], // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
  injection: "<script>console.log('hi')</script>", // Inject additional script.
  mimetypes: { 'application/wasm': ['wasm'] }, // Set extended MIME types
};
liveServer.start(params);
