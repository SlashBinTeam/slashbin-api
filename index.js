"use strict";

const app = require("./app");

// local development
app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"));
const now = new Date().toISOString();
console.log(`${now} Listening at http://localhost:${app.get("port")}`);
