#! /usr/bin/env node
const repl = require("node:repl");
const collection = require("./collection");

// Startup greeting
console.log("Welcome to your music collection!");

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
        console.log("Bye!");
        process.exit();
      default:
        result = "oops";
        break;
    }

    // Display result with line breaks
    console.log(result);

    // Complete process
    callback(null);
  }
}

// Run function
musicCollection();
