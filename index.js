import { program } from "commander";

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const project = require("./package.json");

program.version(project.version);

program
    .command('help')
    .action(() => {
        program.outputHelp();
    });

program.parse(process.argv);