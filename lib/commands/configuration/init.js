export default {
    name: 'init',
    description: 'Start zeck config',
    aliases:[],
    run: async ({program, logger, json}) => {
        const config = json.hasFile('./lib/data/config.json', { returnContent: true });
        console.log(config)
    }
};

