const process = require("process");
const config = require("./config/config");
const pkg = require("./package.json");
const { log } = require('./config/logger');

const { killTimeout } = config.server;

//On server internal error.
const onServerError = () => log.error({ message: `Server error` });

//On server start.
const onListen = (port) => {
  log.info({ message: `DB connected`});
  log.info({ message: `ᕕ(ಠ‿ಠ)ᕗ ${pkg.name} - Running on port: ${port}` });
};

//When the process receive kill signal.
const onProcessKill = (server) => {
  log.info({ message: "Service termination signal received" });

  setTimeout(() => {
    log.info({ message: "Finishing server" });
    server.close(() => process.exit(0));
  }, killTimeout);
};

//When in the server happen a uncaugth exception.
const onException = (err) => {
  log.error({ message: err });
}

module.exports = {
  onListen,
  onProcessKill,
  onServerError,
  onException,
};
