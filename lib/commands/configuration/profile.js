import chalk from "chalk";

export default {
    name: 'profile',
    usage: 'profile [operation] [id]',
    description: 'Manage profile informations',
    aliases:[],
    run: async ({ json, logger, translactions, prompt }, args) => {

        var { update, content } = json.load('./data/config.json', { update: true });
        translactions = translactions('config');
        var operation = args[0];
        var id = args[1];

        switch(operation){
            case'add':
                var answers;
                if (!id){
                    answers = await prompt([{
                        message: translactions.addName,
                        validate: (value) => {
                            if (!value) return translaction.validateNotAllowed;
                            return content.profiles[value] ? translactions.existsProfileName : true
                        }
                    }]);
                } else {
                    answers = [ id ];
                }
                content.profiles[answers[0]] = {}
                update(content);
                logger.success(translactions.addSuccess)
            break

            case'remove':
                if (!id) return logger.error(translactions.notIdRemove);
                if (id == 'default') return logger.error(translactions.notRemoveDefault);
                var profile = content.profiles[id];
                if (!profile) return logger.error(translactions.userNotFound);
                delete content.profiles[id];
                update({...content, currentProfile: content.currentProfile == id ? 'default' : content.currentProfile });
                logger.success(translactions.removeSuccess);
            break
                
            case'reset':
                update({ profiles: {
                    default: {}
                } });
            break
            
            case'checkout':
            case'c':
                var answers;
                if (!id){
                    answers = await prompt([{
                        type: 'list',
                        message: translactions.selectProfileCheckout,
                        choices: Object.keys(content.profiles).map(x => ({ name: content?.currentProfile ==  x ? chalk.green('* ' + x) : x, value: x}))
                    }]);
                } else {
                    answers = [id];
                }
                var profile = content.profiles[answers[0]];
                if (!profile) return logger.error(translactions.userNotFound);
                update({currentProfile: answers[0]});
                logger.success(translactions.successCheckout.replace('***', chalk.cyan(answers[0])));
            break

            case'list':
            default:
                var answers;
                if (!id){
                    answers = await prompt([{
                        type: 'list',
                        message: translactions.selectProfile,
                        choices: Object.keys(content.profiles).map(x => ({ name: content?.currentProfile ==  x ? chalk.green('* ' + x) : x, value: x }))
                    }]);
                    console.clear()
                    if (answers[0] == translactions.addProfile){
                        return
                    } 
                } else {
                    answers = [id];
                }
                var profile = content.profiles[answers[0]];
                if (!profile) return logger.error(translactions.userNotFound);
                var values = Object.entries(profile).map(([key, value]) => [key, value]).filter(([key]) => key != 'password');
                logger.table(
                    ['configuração', 'valor'].map(i => chalk.cyanBright(i)), 
                    [20,30], 
                    values
               );
            break
        }

    }
};

