const fs = require('fs');

const path = require('path');

const pathText = path.join(__dirname, 'text.txt');

const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

const createFile = (text) => {
  fs.writeFile(pathText, text, (err) => {
    if (err) throw err;
  });
};

fs.readdir(__dirname, (err, files) => {
  if (err) throw err;

  if (files.length < 3) {
    createFile('');
  }
});

rl.setPrompt('Hello! Please write the some text.\n');
rl.prompt();
rl.on('line', (text) => {
  if (text === 'exit') {
    console.log('Goodbye, have a nice day!');
    rl.close();
  } else {
    fs.appendFile(pathText, `${text}\n`, (err) => {
      if (err) throw err;
    });
  }
});

rl.on('SIGINT', () => {
  console.log('Goodbye, have a nice day!');
  rl.close();
});
