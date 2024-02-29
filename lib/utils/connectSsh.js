import SftpClient from "ssh2-sftp-client";
import logger from "./logger.js";

const connectSsh = async ({ host, username, password }) => {
    try {
        const sftp = new SftpClient();
        await sftp.connect({ host, username, password });
        return sftp;
    } catch (error) {
        logger.error("Erro ao fazer a conexão SSH");
        process.exit();
    }
};

export default connectSsh;
