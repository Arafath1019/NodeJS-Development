// Importing and working on Nodejs Core modules

const fs = require("fs");

// Write file and append text to written file using synchronous api
try {
  fs.writeFileSync("notesSync.txt", "My name is Yeasin Arafath.");
  fs.appendFileSync("notesSync.txt", " This is appended data!");
  console.log("Append data was appended to file successfully by sync api!");
} catch (err) {
  console.log("Sync api error while writing and appending text into file", err);
}

// Write file and append text to written file using asynchronous api
fs.writeFile("notesAsync.txt", "My name is Yeasin Arafath.", (err) => {
  if (err) throw err;
  console.log("File created successfully by async api");
});

fs.appendFile("notesAsync.txt", " This is appended data!", (err) => {
  if (err) throw err;
  console.log("Append data was appended to file successfully by async api!");
});
