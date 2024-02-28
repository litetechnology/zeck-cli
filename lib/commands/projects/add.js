import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export default {
    name: 'add',
    description: 'Start zeck project configuration',
    aliases:[],
    run: async ({ logger, json, translactions, prompt }) => {

        var { content, update } = json.load('./data/config.json', { update: true });
        var profile = content.profiles[content.currentProfile];
        translactions = translactions("add");

        if (!content.directory) return logger.error(translactions.notDirectory);
        
        const outsideDirectory = await prompt([{
            type:  'confirm',
            message: translactions.outsideDirectory
        }]);
        
        var directory;
        if (outsideDirectory[0]){
            const folders = readdirSync(content.directory);
            const directoryAnswer = await prompt([{
                message: translactions.selectDirectory,
                type: 'list',
                choices: folders.map(x => ({message: x, value: x}))
            }]);
            directory = join(content.directory, directoryAnswer[0]);
        } else {
            const directoryAnswer = await prompt([{
                message: translactions.directory,
                validate: (value) => {
                    if (!value) return translactions.validateNotAllowed;
                    return existsSync(value) ? true : translactions.notExistsDirectory;
                }
            }]);
            directory = directoryAnswer[0];
        }
        
        var config = join(directory, 'zeck.json');
        var existsZeckConfig = existsSync(config);
        content.projects = content?.projects || [];
        if (existsZeckConfig){
            const existsConfigAnswer = await prompt([{
                type:  'confirm',
                message: translactions.existsConfigAnswer
            }]);
            if (existsConfigAnswer[0]){
                config = readFileSync(config).toString();
                config = JSON.parse(config);
                content.projects = content?.projects || [];
                content.projects = [...content.projects, { ...config, directory } ];
                update({projects: content.projects});
                return logger.success(translactions.addSuccess);
            }
        }

        const answers = await prompt([
            {
                message: translactions.selectName,
                name: 'name'
            },
            {
                message: translactions.selectInstall,
                name: 'install'
            },
            {
                message: translactions.selectRun,
                name: 'run'
            },
            {
                message: translactions.selectBuild,
                validate: () => true,
                name: 'build'
            },
            {
                message: translactions.selectBuildDir,
                validate: () => true,
                name: 'buildDir'
            },
            {
                message: translactions.selectType,
                type: 'list',
                name: 'type',
                choices:[
                    {
                        name: 'webapp',
                        value: 'webapp'
                    },
                    {
                        name: 'api',
                        value: 'api'
                    },
                    {
                        name: 'service',
                        value: 'service'
                    }
                ]
            },
            {
                message: translactions.selectGit,
                validate: () => true,
                name: 'github'
            },
            {
                message: translactions.selectRemotePath,
                validate: () => true,
                name: 'remotePath'
            },
            {
                message: translactions.selectRemoteRun,
                validate: () => true,
                name: 'remoteRun'
            },

        ]);

        var config = {
            ...answers,
            directory,
            installDependencies: false,
            lastUpdate: new Date(),
            create: new Date()
        }

        writeFileSync(join(directory, 'zeck.json'), JSON.stringify(config, null, 2));
        update({projects: [ ...content.projects, config ]});
        logger.success(translactions.addSuccess);
        
    }
};

