"use strict";

// aggiunta alla response delle funzioni standard usate da tutti i controller
const resFunctions = (request, res, next) => {
  // catchExpress, da utilizzare nelle catch
  // uso: promise(...)
  //      .then(...)
  //      .catch(error => res.catchExpress(error));
  res.catchExpress = function (error) {
    console.error(error);
    return this.status(500).json({ Error: error.toString() });
  };

  next();
};

// Inizializzazione dei middleware
const init = (app) => {
  app.use(resFunctions);
};

module.exports = {
  init,
};
