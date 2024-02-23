import logger from "./logger.js";
import json from "./json.js";
import { error } from "gulog";

const translactions = (command, options={ defaultLanguage: null, errors: false}) => {
    try {        
        const translactionsFile = json.load('./lib/data/translactions.json');
        var defaultLanguage = options.defaultLanguage ? options.defaultLanguage : translactionsFile.default;
        if (options.errors) return translactionsFile.errors[defaultLanguage];
        return translactionsFile.commands[command][defaultLanguage];
    } catch (err) {
        logger.error('Error finding cli translation.')
        process.exit()
    }
};

export default translactions;