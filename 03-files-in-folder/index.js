const fs = require('fs');

const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    let currentPathFolder = path.join(pathFolder, `${file}`);

    fs.stat(currentPathFolder, (err, stats) => {
      if (err) throw err;

      if (stats.isFile()) {
        let nameFile = file.split('.')[0];
        let extensionFile = path.extname(file).split('.')[1];
        let res = `${nameFile} - ${extensionFile} - ${stats.size}b`;
        console.log(res);
      }
    });
  });
});
