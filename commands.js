//This
//Is
//Header




const fs = require("fs");

//write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
 //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      //we will add the functionality of echo next within the object commandLibrary
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler(command);
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  //the echo command
 "echo": function(userInput) {
     done(userInput);
 },

 "cat": function(fullPath) {
     const fileName = fullPath[0];
     fs.readFile(fileName, (err, data) => {
         if (err) throw err;
         done(data);
     });
 },

 "head": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, 'utf8', (err, data) => {
          if (err) throw err;
          const lineEntries = data.split("\r");
          const headerLineCount = 3;
          var header = "";
          for (let index = 0; index < headerLineCount; index++){
            header+=lineEntries[index] + "\r";
          }
          done(header);
      });
 },

 "tail": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, 'utf8', (err, data) => {
          if (err) throw err;
          const lineEntries = data.split("\r");
          const tailLineCount = 3;
          var tail = "";
          for (let index = lineEntries.length - tailLineCount - 1; index < lineEntries.length - 1; index++){
            tail+=lineEntries[index] + "\r";
          }
          done(tail);
      });
 },

  "errorHandler": function(command) {
    done(`${command} is not a valid command.  Please enter a valid command.`);
  }

};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
//This
//Is
//Tail
