import { existsSync} from 'node:fs';

import { encode, decode } from '../../utils/jwt.js';
export default {
    name: 'import',
    description: 'Import zeck settings using a token',
    aliases:[],
    run: async ({ logger, json, translactions, prompt }) => {

        const project = json.load('../package.json');
        var translaction = translactions('import');
        const path = './data/config.json';
        
        const hasConfig = json.hasFile(path);
        if (hasConfig.status){
            const hasConfigAnswer = await prompt([{
                type: 'confirm',
                message: translaction.hasConfigAnswer
            }]);
            if (!hasConfigAnswer[0]) return;
            console.clear();
        }
        
        var { update, content } = json.load(path, { update: true });
        var directory = content?.directory;

        var token = await prompt([
            {
                message: translaction.selectToken
            }
        ]);  
        token = token[0];      
        var payload
        await prompt([
            {
                type: 'password',
                message: translaction.selectPassword,
                validate: (value) => {
                    if (!value) return translaction.validateNotAllowed;
                    payload = decode(token, value);
                    return payload ? true : translaction.incorrectPassword
                }
            }
        ]);
        if (directory){

            var hasConfirm = await prompt([
                {
                    type: 'confirm',
                    message: translaction.hasDirectory
                }
            ]);
        }

        if (!directory || hasConfirm[1]){
            directory = await prompt([
                {
                    name: 'directory',
                    message: translaction.directory,
                    validate: (value) => {
                        if (!value) return translaction.validateNotAllowed;
                        return existsSync(value) ? true : translaction.notExistsDirectory;
                    }
                },
            ]);
            directory = directory[0];
        }
        
        payload = { ...payload, directory };
        update(payload, { rewrite: true});
        if (payload?.defaultLanguage) json.update('./data/translactions.json', { default: payload?.defaultLanguage });
        logger.success(translaction.success);
        }
};

