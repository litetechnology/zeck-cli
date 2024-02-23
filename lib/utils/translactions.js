import logger from "./logger.js";
import json from "./json.js";

const translactions = (command, options={ defaultLanguage: null }) => {
    try {        
        const translactionsFile = json.load('./lib/data/translactions.json');
        var defaultLanguage = options.defaultLanguage ? options.defaultLanguage : translactionsFile.default;
        return translactionsFile.commands[command][defaultLanguage];
    } catch (err) {
        logger.error('Error finding cli translation.')
        process.exit()
    }
};

export default translactions;