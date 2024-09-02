const path = require("path");
const fs = require('fs');

// This will resolve the directory to the current script's directory
const directoryPath = path.resolve(__dirname); 

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
  case "read":
    if (!file) {
      console.log('Provide file name');
    } else {
      const filePath = path.resolve(__dirname, file);
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Content of the file '${file}': ${data}`);
        }
      });
    }
    break;

  case "append":
    if (!file || !content) {
      console.log('Please provide both file and content');
    } else {
      const filePath = path.resolve(__dirname, file);
      fs.appendFile(filePath, `\n${content}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Content appended to the file ${file}`);
        }
      });
    }
    break;

  case "delete":
    if (!file) {
      console.log('Please provide file name');
    } else {
      const filePath = path.resolve(__dirname, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`File ${file} deleted`);
        }
      });
    }
    break;

  case "create":
    if (!file || !content) {
      console.log('Please provide both file and content');
    } else {
      const filePath = path.resolve(__dirname, file);
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`File ${file} is successfully created with content ${content}`);
        }
      });
    }
    break;

  case "rename":
    if (!file) {
      console.log('Please provide the file name');
    } else {
      const filePath = path.resolve(__dirname, file);
      fs.rename(filePath, "test.txt", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`File ${file} is renamed to test.txt`);
        }
      });
    }
    break;

  case "list":
    try {
      // List files in the current directory
      const fileList = fs.readdirSync(directoryPath);
      console.log(fileList);
    } catch (err) {
      console.error(`Error listing directory contents: ${err.message}`);
    }
    break;

  default:
    console.log(`Invalid operation '${operation}'`);
    break;
}
