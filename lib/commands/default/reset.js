export default {
    name: 'reset',
    description: 'Reset zeck all configurations',
    aliases:[],
    run: async ({ json, prompt, translactions, logger }) => {
        translactions = translactions("reset");
        const hasConfigAnswer = await prompt([{
            type: 'confirm',
            message: translactions.confirm
        }]);
        if (!hasConfigAnswer[0]) return;
        json.update('./data/translactions.json', { default: 'en' });
        json.update('./data/config.json', {}, { rewrite: true });
        json.update('./data/todo.json', {
            data: []
        }, { rewrite: true });
        logger.success(translactions.success);
    }
};

