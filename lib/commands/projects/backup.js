import chalk from 'chalk';
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path';

export default {
    name: 'backup',
    usage: 'backup <type>',
    description: 'Update zeck project',
    aliases:[],
    run: async ({ logger, json, translactions, prompt, cmd , ssh}, { '0': type}) => {

        var { content, update } = json.load('./data/config.json', { update: true });
        var profile = content.profiles[content.currentProfile];
        translactions = translactions("backup");
        const { connectSftp, connectConn, connExec } = ssh;
        
        var projects = content?.projects;

        if (!content?.directory) return logger.error(translactions.notDirectory);
        if (!projects) return logger.error(translactions.notProjects);

        const createDir = async (path) => {
            try {
                await mkdir(path, { recursive: true });
            } catch (err) {
                return logger.error(translactions.errorDir);
            }
        }

        var { confirmScope } = await prompt([{
            type: 'confirm',
            name: 'confirmScope',
            message: translactions.confirmScope
        }])
        var list;
        if (confirmScope){
            var { project } = await prompt([{
                choices: projects.map(x => ({ name: x.name, value: x })),
                message: translactions.selectProject,
                name: 'project',
                type: 'list'
            }]);
            list = [project];
        } else {
            list = project;
        }

        if (type == 'remote'){
            const sftp = await connectSftp(profile);
            const conn = await connectConn(profile);
            var file = `backup-remote-${Date.now()}.zip`
            var path = join(content.directory, '.zeck-backups/remote', file);
            createDir(path);
            logger.info(translactions.loadingVps.replace('***', chalk.green(profile.username + '@' + profile.host)));
            const downloadDir = async (remotePath, ignore=[]) => {
                try {
                    //var existsRemotePath = await sftp.exists(remotePath);
                    //if (!existsRemotePath) return console.log('inexistente');
                    //await connExec(conn, ``);
                    //await sftp.fastGet(join(remotePath, file), path);
                    //await sftp.delete(join(remotePath, file));
                } catch (err) {
                    console.log('sftp error', err);
                }
                
            }
            await Promise.all(list.map(x => {
                if (!x.remotePath) return;
                downloadDir(x?.remotePath,  join(path, x.name), x?.ignore)
            }))
    
            await sftp.end();
            conn.end()
        } else {

        }


       logger.success(translactions.success);
    }
};

