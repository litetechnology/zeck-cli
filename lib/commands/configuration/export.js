import { encode, decode } from '../../utils/jwt.js';

export default {
    name: 'export',
    description: 'Export as settings securely',
    aliases:[],
    run: async ({ logger, json, translactions, prompt }) => {

        var { update, content } = json.load('./data/config.json', { update: true });
        const project = json.load('../package.json');
        var translaction = translactions('export');

        const hasConfigAnswer = await prompt([{
            type: 'confirm',
            message: translaction.hasConfigAnswer
        }]);
        if (!hasConfigAnswer[0]) return;

        const answer = await prompt([{
            type: 'password',
            message: translaction.selectPassword
        }]);        
       
        logger.info(translaction.loading);
        var payload = {
            version: project.version, 
            date: Date.now(),
            ...content
        };
        var token = encode(payload, answer[0]);
        logger.success(translaction.success);
        console.log({token})
    }
};

