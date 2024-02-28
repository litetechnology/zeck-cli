export default {
    name: 'remove',
    usage: 'remove [name]',
    description: 'Remove zeck project',
    aliases:[],
    run: async ({ logger, json, translactions, prompt }, { '0': name}) => {

        var { content, update } = json.load('./data/config.json', { update: true });
        translactions = translactions("remove");
        var projects = content?.projects;

        if (!projects) return logger.error(translactions.notProjects);

        var project;
        if (name){
            project = projects.find(x => x.name == name);
            if (!project) return logger.error(translactions.notExistsProject);
        } else {
            var { project } = await prompt([{
                choices: projects.map(x => ({ name: x.name, value: x })),
                message: translactions.selectProject,
                name: 'project',
                type: 'list'
            }]);
        }

        projects = projects.filter(x => x.name !== project.name);
        update({projects});
        logger.success(translactions.success);
    }
};

