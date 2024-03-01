#! /usr/bin/env node

// REPL Docs https://nodejs.org/docs/latest/api/repl.html
const repl = require("node:repl");

// Startup greeting
console.log("Welcome to your music collection!" + "\n");

function musicCollection() {
  const options = {
    eval: evaluator,
  };

  // Create a instance of REPLServer
  const replServer = repl.start(options);

  // Evaluate user input
  function evaluator(cmd, _, _, callback) {
    if (cmd === "quit") {
      console.log("Bye!");
      process.exit();
    }

    const input = cmd.trim();
    callback(null, input);
  }
}

musicCollection();
