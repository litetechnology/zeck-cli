import chalk from 'chalk';
import {  existsSync } from 'node:fs';
import { join } from 'node:path';

export default {
    name: 'update',
    usage: 'update [name]',
    description: 'Update zeck project',
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

        var projectIndex = projects.findIndex(x => x.name == project.name);

        if (!existsSync(project?.directory)) return logger.error(translactions.notProjectDirectory);
        if (!project.remotePath) return logger.error(translactions.notProjectRemoteDirectory);
        


        logger.info(translactions.loading);

        if (project.build){
            logger.info(translactions.build);
            if (!project.buildDir) return logger.error(translactions.notBuildDir);
            await cmd(project.build, project.directory);
            project.directory = join(project.directory, project.buildDir);
            if (!existsSync(project.directory)) return logger.error(translactions.errorBuild);
        }

        const sftp = await connectSftp(profile);
        const conn = await connectConn(profile);
        logger.info(translactions.loadingVps.replace('***', chalk.green(profile.username + '@' + profile.host)));

        await sftp.uploadDir(project.directory, project.remotePath, {
            concurrency: 100, 
            filter: (item) =>  project.ignore.every((x) => !item.includes(x))
        });

        if (project.remoteRun){
            logger.info(translactions.remoteRun);
            try {
                await connExec(conn, `cd ${project.remotePath} && ${project.install}`);
                await connExec(conn, `cd ${project.remotePath} && ${project.remoteRun}`);
            } catch (error) {
                conn.end();
                await sftp.end();
                logger.error(translactions.errorRemote);
            }
        }
        logger.success(translactions.success);
        await sftp.end();
        conn.end();
    }
};

