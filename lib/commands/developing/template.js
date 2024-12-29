import { existsSync, mkdirSync, createWriteStream, createReadStream } from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import unzipper from 'unzipper'; // Certifique-se de ter a dependência unzipper instalada com 'npm install unzipper'

const downloadRepoAsZip = async (repoUrl, zipPath) => {
  const writer = createWriteStream(zipPath);
  const response = await axios.get(repoUrl, { responseType: 'stream' });
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const extractFolder = (zipPath, targetFolder, folderName) => {
  return new Promise((resolve, reject) => {
    const extract = unzipper.Extract({ path: targetFolder });

    extract.on('close', () => resolve(folderName));
    extract.on('error', reject);

    createReadStream(zipPath)
      .pipe(unzipper.Parse())
      .on('entry', entry => {
        const filePath = entry.path;
        if (filePath.startsWith(folderName)) {
          entry.pipe(createWriteStream(path.join(targetFolder, filePath)));
        } else {
          entry.autodrain();
        }
      });
  });
};

export default {
    name: 'template',
    usage: 'template',
    description: 'Use backend and frontend templates',
    aliases: [],
    run: async ({ translactions, prompt }, {}) => {
        translactions = translactions("template");

        try {
            const response = await axios.get('https://raw.githubusercontent.com/litetechnology/zeck-frontend-templates/master/templates.json');
            const templates = response.data;

            const selectArea = await prompt([{
                message: translactions.selectStack,
                type: 'list',
                choices: Object.keys(templates).map(x => ({ name: x, value: x }))
            }]);

            const selectTemplates = templates[selectArea[0]];
            let selectProject = await prompt([{
                message: translactions.selectProject,
                type: 'list',
                choices: selectTemplates.map(x => ({ name: x.name, value: x }))
            }]);

            const selectedProject = selectProject[0];

            const targetDirectory = path.resolve(process.cwd(), selectedProject.name);
            if (!existsSync(targetDirectory)) {
                mkdirSync(targetDirectory, { recursive: true });
            }

            const zipFileUrl = `https://github.com/litetechnology/zeck-frontend-templates/archive/master.zip`;

            const zipFilePath = path.join(targetDirectory, 'repo.zip');

            await downloadRepoAsZip(zipFileUrl, zipFilePath);
            console.log(`Repositório baixado para: ${zipFilePath}`);

            // Extrair a pasta react-js manualmente
            await extractFolder(zipFilePath, targetDirectory, '/templates/react-js');
            console.log(`Pasta react-js extraída com sucesso!`);

        } catch (error) {
            console.error('Erro ao acessar o arquivo:', error);
        }
    }
};
