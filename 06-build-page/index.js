const fs = require('fs');

const path = require('path');

const projectFolderPath = path.join(__dirname, 'project-dist');

fs.mkdir(projectFolderPath, { recursive: true }, (err) => {
  if (err) throw err;
});

//                          Create index.html

const templateFilePath = path.join(__dirname, 'template.html');

fs.readFile(templateFilePath, 'utf-8', (err, data) => {
  if (err) throw err;

  let templateHtml = data;

  const componentsFolderPatch = path.join(__dirname, 'components');

  fs.readdir(componentsFolderPatch, (err, folder) => {
    if (err) throw err;

    folder.forEach((file) => {
      const componentFilePatch = path.join(componentsFolderPatch, `${file}`);

      let nameFile = file.split('.')[0];

      if (
        templateHtml.includes(`{{${nameFile}}}`) &&
        path.extname(file) === '.html'
      ) {
        fs.readFile(componentFilePatch, 'utf-8', (err, data) => {
          if (err) throw err;

          let componentsHtml = data;

          const replacesTemplateHtml = () => {
            let newTemplateHtml = templateHtml.replace(
              `{{${nameFile}}}`,
              `${componentsHtml}`,
            );
            templateHtml = newTemplateHtml;
            return templateHtml;
          };

          let newTemplateHtml = replacesTemplateHtml();

          const indexHtmlPath = path.join(projectFolderPath, 'index.html');

          fs.writeFile(indexHtmlPath, newTemplateHtml, (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
});

//                         Create style.css

const folderStylesPath = path.join(__dirname, 'styles');

fs.readdir(folderStylesPath, (err, folder) => {
  if (err) throw err;

  const styleArr = [];

  folder.forEach((file) => {
    let currentPathFile = path.join(folderStylesPath, `${file}`);

    fs.stat(currentPathFile, (err, stats) => {
      if (err) throw err;

      if (stats.isFile && path.extname(file) === '.css') {
        fs.readFile(currentPathFile, 'utf-8', (err, data) => {
          if (err) throw err;

          styleArr.push(data);

          const styleCssPath = path.join(projectFolderPath, 'style.css');

          fs.writeFile(styleCssPath, styleArr.join('\n'), (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
});

//                      Create new assets folder

const newAssetsFolderPath = path.join(projectFolderPath, 'assets');

fs.mkdir(newAssetsFolderPath, { recursive: true }, (err) => {
  if (err) throw err;
});

//                      Fill the folder assets

const copyFolder = (folderPath, newFolderPath) => {
  fs.mkdir(newFolderPath, { recursive: true }, (err) => {
    if (err) throw err;

    fs.readdir(folderPath, (err, folder) => {
      if (err) throw err;

      folder.forEach((file) => {
        const currentFolderPath = path.join(folderPath, file);
        const newCurrentFolderPath = path.join(newFolderPath, file);

        fs.stat(currentFolderPath, (err, stats) => {
          if (err) throw err;

          if (stats.isFile()) {
            fs.copyFile(currentFolderPath, newCurrentFolderPath, (err) => {
              if (err) throw err;
            });
          } else {
            copyFolder(currentFolderPath, newCurrentFolderPath);
          }
        });
      });
    });
  });
};

const assetsFolderPath = path.join(__dirname, 'assets');

copyFolder(assetsFolderPath, newAssetsFolderPath);
