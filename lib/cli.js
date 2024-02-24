import { readdirSync } from "node:fs";
import { program } from "commander";

import translactions from "./utils/translactions.js";
import absolutePath from "./utils/absolutePath.js";
import prompt from "./utils/prompt.js";
import logger from "./utils/logger.js";
import json from "./utils/json.js";

const project = json.load('../package.json');

program.version(project.version);
const commandDirectories = readdirSync(absolutePath('./commands'));


(async () => {
    for (const dir of commandDirectories) {
        const cmds = readdirSync(absolutePath(`./commands/${dir}`)).filter(file => file.endsWith('.js'));
        for (const file of cmds) {
            let cmd = await import(`./commands/${dir}/${file}`);
            cmd = cmd?.default ? cmd.default : cmd;
            if (cmd?.name) {
                program
                .command(cmd?.usage ? cmd.usage : cmd.name)
                .description(cmd?.description || "")
                .action((...args) => cmd.run({ program, logger, json, translactions, prompt }, {...args}) );
            } else {
                continue;
            }
        }
    }
    
    program.parse(process.argv);
})();
