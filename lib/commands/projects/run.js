import chalk from 'chalk';
import {  existsSync } from 'node:fs';
import { join } from 'node:path';

export default {
    name: 'run',
    usage: 'run [name]',
    description: 'Run zeck project in vps',
    aliases:[],
    run: async ({ logger, json, translactions, prompt, cmd , ssh}, { '0': name}) => {

        var { content, update } = json.load('./data/config.json', { update: true });
        var profile = content.profiles[content.currentProfile];
        translactions = translactions("update");
        const { connectConn, connectSftp, connExec} = ssh;
        
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

        if (!project.remotePath) return logger.error(translactions.notProjectRemoteDirectory);

        const conn = await connectConn(profile);
        logger.info(translactions.loadingVps.replace('***', chalk.green(profile.username + '@' + profile.host)));

        if (project.remoteRun){
            logger.info(translactions.remoteRun);
            try {
                await connExec(conn, `cd ${project.remotePath} && ${project.install}`);
                await connExec(conn, `cd ${project.remotePath} && ${project.remoteRun}`);
            } catch (error) {
                conn.end();
                logger.error(translactions.errorRemote);
            }
        }
        logger.success(translactions.success);
        conn.end();
    }
};

