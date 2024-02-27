import request from "../../utils/request.js";

export default {
    name: 'ping',
    usage: 'ping [repeatSize] [url]',
    description: 'Send a ping request to check the status of a server',
    aliases:[],
    run: async ({ json, prompt, translactions, logger }, { '0': repeatSize, '1': url }) => {

        var { content } = json.load('./data/config.json', { update: true });
        translactions = translactions("ping");
        var profile = content.profiles[content.currentProfile];
        repeatSize = repeatSize || 1;
        url = profile.url || url;

        
        var counter = 1;
        const interval = setInterval(() => {
            const ping = async () => {
               logger.info(translactions.loading.replace('***', counter + '/' + repeatSize))
               var response =  await request({ url });
               if (!response.status){
                    logger.error(translactions.requestError);
                    console.log(response);
                    clearInterval(interval)
               } 
               console.log(response, '\n');
            };
          counter == repeatSize ? clearInterval(interval) : ping();
          counter += 1;
        }, 30*1000)

    }   
};
