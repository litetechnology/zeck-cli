import { existsSync } from 'node:fs';
import inquirer from "inquirer";

export default {
    name: 'init',
    description: 'Start zeck config',
    aliases:[],
    run: async ({ logger, json, translactions, prompt }) => {

        const path = './lib/data/config.json';
        var translaction = translactions('init');
        const hasConfig = json.hasFile(path);
        if (hasConfig){
            const hasConfigAnswer = await prompt([{
                type: 'confirm',
                message: translaction.hasConfigAnswer
            }]);
            if (!hasConfigAnswer[0]) return;
            console.clear();
        }
        logger.figlet('ZECK CLI');

        const newLanguage = await prompt([{
            message: 'Select the main zeck language / Selecione a linguagem principal do zeck',
            type: 'list',
            choices:[
                {
                    name: 'english (default)',
                    value: 'en'
                },
                {
                    name: 'português',
                    value: 'pt'
                }
            ]
        }])

        json.update('./lib/data/translactions.json', { default: newLanguage[0] });
        translaction = translactions('init');

        const answers = await prompt([
            {
                name: 'directory',
                message: translaction.directory,
                validate: (value) => {
                    if (!value) return translaction.validateNotAllowed;
                    return existsSync(value) ? true : translaction.notExistsDirectory;
                }
            },
            {
                name: 'useVps',
                type: 'confirm',
                message: translaction.useVps,
            },
            {
                name: 'useTodo',
                type: 'confirm',
                message: translaction.useTodo,
            }
        ]);
        
        json.update(path, {
            defaultLanguage: newLanguage[0],
            lastUpdate: Date.now(),
            profiles: {
                default: {}
            },
            ...answers
        }, { rewrite: true });

        if (answers.useTodo){
            json.update('./lib/data/todo.json', {
                data: []
            });
        }
        
        console.clear();
        logger.figlet('ZECK CLI')
        logger.success(translaction.automaticBackup);
    }
};

