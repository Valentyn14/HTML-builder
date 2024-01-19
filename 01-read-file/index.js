const fs = require('fs');

const path = require('path');

const pathText = path.join(__dirname, 'text.txt');

const readStream = new fs.createReadStream(pathText);

try {
  let data = '';

  readStream.on('data', (chunk) => (data += chunk.toString()));

  readStream.on('end', () => console.log(data));
} catch (err) {
  console.log(err);
}
