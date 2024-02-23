import { readdirSync } from "node:fs";
import { program } from "commander";

import translactions from "./utils/translactions.js";
import prompt from "./utils/prompt.js";
import logger from "./utils/logger.js";
import json from "./utils/json.js";

const project = json.load("./package.json");

program.version(project.version);

const commandDirectories = readdirSync('./lib/commands');

(async () => {
    for (const dir of commandDirectories) {
        const cmds = readdirSync(`./lib/commands/${dir}`).filter(file => file.endsWith('.js'));
        for (const file of cmds) {
            let cmd = await import(`./commands/${dir}/${file}`);
            cmd = cmd?.default ? cmd.default : cmd;
            if (cmd?.name) {
                program
                    .command(cmd.name)
                    .description(cmd?.description || "")
                    .action((...args) => cmd.run({ program, args, logger, json, translactions, prompt }) );
            } else {
                continue;
            }
        }
    }

    program.parse(process.argv);
})();
