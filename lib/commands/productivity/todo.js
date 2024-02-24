import chalk from "chalk";

export default {
    name: 'todo',
    usage: 'todo [operation] [id]',
    description: 'Manage todo informations',
    aliases:[],
    run: async ({ json, logger, translactions, prompt }, args) => {

        var { update, content } = json.load('./data/todo.json', { update: true });
        translactions = translactions('todo');
        var operation = args[0];
        var id = args[1];

        switch(operation){
            case'add':
                let answers;
                if (!args[1]){
                    answers = await prompt([{
                        message: translactions.description
                    }]);
                } else {
                    answers = [ args[1] ];
                }
                content.data.push({ description: answers[0], status: false});
                update(content);
                logger.success(translactions.addSuccess)
            break

            case'remove':
                if (!id) return logger.error(translactions.notIdRemove);
                var task = content.data.find((i, index) => index == id);
                if (!task) return logger.error(translactions.notFoundId);
                content.data = content.data.filter((i, index) => index != id);
                update(content);
                logger.success(translactions.removeSuccess);
                break
                
            case'status':
                if (!id) return logger.error(translactions.notIdStatus);
                var task = content.data.find((i, index) => index == id);
                if (!task) return logger.error(translactions.notFoundId);
                content.data[id] = { ...task, status: !task.status };
                update(content);
                logger.success(translactions.statusSuccess);
            break
            
            case'reset':
                update({ data: []}, { rewrite: true });
            break
            
            case'list':
            default:
               logger.table(
                    ['id', 'todo', 'status'].map(i => chalk.cyanBright(i)), 
                    [5, 50, 15], 
                    content.data.map((item, index) => [
                        index, item.description, item.status ? chalk.green(translactions.true) : chalk.red(translactions.false)
                    ])
               );
            break
        }

    }
};

