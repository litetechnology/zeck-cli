import { readdirSync } from "node:fs";
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import json from "./utils/json.js";
import { program } from "commander";

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
                    .action((...args) => cmd.run({ program, args }));
            } else {
                continue;
            }
        }
    }

    program.parse(process.argv);
})();
