const fs = require('fs');

const path = require('path');

const folderStylesPath = path.join(__dirname, 'styles');

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(bundlePath, '', (err) => {
  if (err) throw err;
});

fs.readdir(folderStylesPath, (err, files) => {
  if (err) throw err;

  const styleArr = [];

  files.forEach((file) => {
    let currentPathFile = path.join(folderStylesPath, `${file}`);

    fs.stat(currentPathFile, (err, stats) => {
      if (err) throw err;

      if (stats.isFile && path.extname(file) === '.css') {
        fs.readFile(currentPathFile, 'utf-8', (err, data) => {
          if (err) throw err;

          styleArr.push(data);

          fs.writeFile(bundlePath, styleArr.join(''), (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
});
