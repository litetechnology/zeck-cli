import { existsSync } from 'node:fs';
import inquirer from "inquirer";

export default {
    name: 'init',
    description: 'Start zeck config',
    aliases:[],
    run: async ({ logger, json, translactions, prompt }) => {

        const path = './lib/data/config.json';
        translactions = translactions('init');

        logger.figlet('ZECK CLI')
        json.hasFile(path, { returnContent: true });
        const hasConfigAnswer = await prompt([{
            type: 'confirm',
            message: 'Você já tem um arquivo de configuração, deseja reescreve-lo ?'
        }]);
        return console.log(hasConfigAnswer[0])
        /*
        const validate = (value) => value ? true : 'An empty answer is not allowed';

        let answers;
        answers = await inquirer.prompt([
            {
                type: 'input',
                prefix: '(zeck)',
                name: 'directory',
                message: 'What is your working directory?',
                validate: (value) => {
                    if (!value) return  'An empty answer is not allowed';
                    return existsSync(value) ? true : 'The directory you sent does not exist';
                }
            },
            {
                type: 'confirm',
                name: 'useVps',
                prefix: '(zeck)',
                message: 'Do you have a vps? If so, do you want to use some commands to manage it?',
                validate
            },
            {
                type: 'confirm',
                name: 'useTodo',
                prefix: '(zeck)',
                message: 'Are you interested in using my task list commands?',
                validate
            },
        ]);
        */
        json.update(path, {
            lastUpdate: Date.now(),
            ...answers
        }, { rewrite: true });

        if (answers.useTodo){
            json.update('./lib/data/todo.json', {
                data: []
            });
        }
        
        console.clear();
        logger.figlet('ZECK CLI')
        logger.success('Configuration completed successfully, Use "zeck help" for help and "zeck config" to finish the configurations.');
    }
};

