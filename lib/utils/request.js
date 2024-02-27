import https from 'https';

const request = async (config = { url, method: 'GET', headers: {}, body: {} }) => {
    const startTime = new Date();
    try {
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });
      
        const response = await fetch(config.url, {
            method: config.method,
            headers: {
                'Content-Type': 'application/json',
                ...config.headers
            },
            body: JSON.stringify(config.body),
            agent: httpsAgent
        });

        return {
            status: true,
            duration: (((new Date()) - startTime) / 1000) + 's',
            data: response.statusText
        };

    } catch (err) {
        return {
            duration: (((new Date()) - startTime) / 1000) + 's',
            status: false,
            data: err
        };
    }
};

export default request;
