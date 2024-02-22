import { readdirSync } from "node:fs";
import { program } from "commander";

const project = require("../package.json");

program.version(project.version);

readdirSync('./lib/commands').forEach((dir, index) => {
    const cmds = readdirSync('./lib/commands/' + dir).filter(file => file.endsWith('.js'));
    for (let file of cmds){
        const cmd = require(`./commands/${dir}/${file}`);
        if (cmd.name){

        } else {
            continue;
        }
    }
})

program.parse(process.argv);