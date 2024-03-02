#! /usr/bin/env node
const repl = require("node:repl");
const collection = require("./collection");
const string = require("./utils/string");
const errors = require("./utils/errors");

// Startup greeting
console.log(string.padded("Welcome to your music collection!"));

function musicCollection() {
  // Create a instance of REPLServer with custom evaluator
  const replServer = repl.start({
    eval: evaluator,
  });

  function evaluator(cmd, context, filename, callback) {
    let result;
    const command = cmd.trim();
    const action = command.split(" ")[0];

    switch (action) {
      case "add":
        result = collection.add(command);
        break;
      case "play":
        result = collection.play(command);
        break;
      case "show":
        result = collection.show(command);
        break;
      case "help":
        result = "commandList";
        break;
      case "quit":
        console.log(string.padded("Bye!"));
        process.exit();
      default:
        result = errors.invalidInput;
        break;
    }

    // Display result with line breaks
    console.log(string.padded(result));

    // Complete process
    callback(null);
  }
}

// Run function
musicCollection();
