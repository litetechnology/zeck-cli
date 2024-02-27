import chalk from "chalk";

const setLanguage = async (tools) => {
    const answers = await tools.prompt([{
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

    tools.json.update('./data/translactions.json', { default: answers[0] });
    return { status: true, data: answers }
};

const setVps = async (tools, config) => {
    const confirm = await tools.prompt([{
        message: tools.translactions.confirmText,
        type: 'confirm'
    }]);
    if (!confirm[0]) return { status: false, data: null }

    const answers = await tools.prompt([
        {
             message: tools.translactions.selectHost,
             name: 'host'
        },
        {
             message: tools.translactions.selectUsername,
             name: 'username'
        },
        {
             message: tools.translactions.selectPassword,
             type: 'password',
             name: 'password'
        }
    ])
    config.content.profiles[config.content.currentProfile] = {...config.content.profiles[config.content.currentProfile], ...answers, };
    config.update({profiles: config.content.profiles})
    return { status: true, data: answers }
};

const setUrl = async (tools, config) => {
    const answers = await tools.prompt([{
        message: tools.translactions.selectUrl
    }]);
    config.content.profiles[config.content.currentProfile] = {...config.content.profiles[config.content.currentProfile], url: answers[0], };
    config.update({profiles: config.content.profiles});
    return { status: true, data: answers }
};

export default {
    name: 'config',
    usage: 'config [operation] [args...]',
    description: 'Manage config informations',
    aliases:[],
    run: async ({ json, logger, translactions, prompt }, args) => {

        var config = json.load('./data/config.json', { update: true });
        translactions = translactions('config');
        var operation = args[0];

        switch(operation){
            case'language':
            case'linguagem':
                var response = await setLanguage({config, prompt, json});
                if (response.status){
                    logger.success(translactions.successLanguage)
                } else {
                    logger.error(translactions.errorLanguage)
                }
            break

            case'vps':
                var response = await setVps({prompt, translactions}, config);
                if (response.status){
                    logger.success(translactions.successVps)
                } else {
                    logger.error(translactions.errorVps)
                }
            break
                
            case'link':
            case'url':
                var response = await setUrl({prompt, translactions}, config);
                if (response.status){
                    logger.success(translactions.successUrl)
                } else {
                    logger.error(translactions.errorUrl)
                }
            break

            case'all':
                var language = await setLanguage({config, prompt, json});
                if (!language.status) return logger.error(translactions.errorLanguage)
                var vps = await setVps({prompt, translactions}, config);
                if (!vps.status) return logger.error(translactions.errorVps)
                var url = await setUrl({prompt, translactions}, config);
                if (!url.status) return logger.error(translactions.errorUrl)
                logger.success(translactions.successAll);
            break

            case'list':
            default:
                var profile = config.content.profiles[config.content.currentProfile];
                if (!profile) return logger.error(translactions.userNotFound);
                var values = Object.entries(profile).map(([key, value]) => [key, value]).filter(([key]) => key != 'password');
                logger.table(
                    ['key', 'value'].map(i => chalk.cyanBright(i)), 
                    [20,30], 
                    values
               );
            break
        }

    }
};

