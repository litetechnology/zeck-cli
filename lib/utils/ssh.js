import SftpClient from "ssh2-sftp-client";
import { Client} from 'ssh2';

import logger from "./logger.js";

const connectSftp = async ({ host, username, password }) => {
    try {
        const sftp = new SftpClient();
        await sftp.connect({ host, username, password });
        return sftp;
    } catch (error) {
        logger.error("Erro ao fazer a conexão SSH");
        process.exit();
    }
};

const connectConn = async ({ host, username, password }) => {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on('ready', () => {
            resolve(conn);
        }).on('error', (err) => {
            reject(err);
        }).connect({
            host,
            username,
            password,
        });
    });
};

const connExec = async (conn, cmd) => {
    return new Promise((resolve, reject) => {
        const stream = conn.exec(cmd, (err, stream) => {
            if (err) {
                reject(err);
                return;
            }

            let stdout = '';
            let stderr = '';

            stream.on('data', (data) => {
                stdout += data.toString();
            });

            stream.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            stream.on('close', (code) => {
                if (code === 0) {
                    resolve({ error: false, data: stdout });
                } else {
                    reject({ error: true, data: stderr });
                }
            });
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};

export default { connectSftp, connectConn, connExec };
