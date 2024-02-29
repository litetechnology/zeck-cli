import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export default {
    name: 'update',
    usage: 'update [name]',
    description: 'Update zeck project',
    aliases:[],
    run: async ({ logger, json, translactions, prompt, cmd , connectSsh}, { '0': name}) => {

        var { content, update } = json.load('./data/config.json', { update: true });
        var profile = content.profiles[content.currentProfile];
        translactions = translactions("update");
        
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

        var projectIndex = projects.findIndex(x => x.name == project.name);

        if (!existsSync(project?.directory)) return logger.error(translactions.notProjectDirectory);
        if (!project.remotePath) return logger.error(translactions.notProjectRemoteDirectory);
        
        const sftp = await connectSsh(profile);

        logger.info(translactions.loading);
        await sftp.uploadDir(project.directory, project.remotePath, {
            concurrency: 30, 
            filter: (item) => {
                const shouldInclude = ['node_modules', '.git'].every((x) => !item.includes(x));
                return shouldInclude;
              }
        });
        logger.success(translactions.success);


    }
};

