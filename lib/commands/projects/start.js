import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export default {
    name: 'start',
    usage: 'start [name]',
    description: 'Start zeck project',
    aliases:[],
    run: async ({ logger, json, translactions, prompt }, { '0': name}) => {

        var { content, update } = json.load('./data/config.json', { update: true });
        var profile = content.profiles[content.currentProfile];
        translactions = translactions("start");
        var projects = content?.projects;

        if (!content?.directory) return logger.error(translactions.notDirectory);
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

        if (!existsSync(project?.directory)) return logger.error(translactions.notProjectDirectory);
        if (!project?.run) return logger.error(translactions.notProjectRunCommand);

    }
};

