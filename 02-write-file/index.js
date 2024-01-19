const fs = require('fs');

const path = require('path');

const pathText = path.join(__dirname, 'text.txt');

const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

const createFile = () => {
  fs.writeFile(pathText, '', (err) => {
    if (err) throw err;
  });
};

createFile();

rl.setPrompt('Hello! Please write the some text.\n');
rl.prompt();
rl.on('line', (text) => {
  if (text === 'exit') {
    console.log('Goodbye, have a nice day!');
    createFile();
    rl.close();
  } else {
    fs.appendFile(pathText, `${text}\n`, (err) => {
      if (err) throw err;
    });
  }
});

rl.on('SIGINT', () => {
  console.log('Goodbye, have a nice day!');
  createFile();
  rl.close();
});
