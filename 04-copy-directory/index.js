const fs = require('fs');

const path = require('path');

const folderPath = path.join(__dirname, 'files');

const newFolderPath = path.join(__dirname, 'files-copy');

fs.mkdir(newFolderPath, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(newFolderPath, (err, newFiles) => {
  if (err) throw err;

  newFiles.forEach((newFile) => {
    let currentFilePath = path.join(newFolderPath, newFile);

    fs.unlink(currentFilePath, (err) => {
      if (err) throw err;
    });
  });

  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.writeFile(path.join(newFolderPath, file), '', (err) => {
        if (err) throw err;
      });
    });
  });
});
