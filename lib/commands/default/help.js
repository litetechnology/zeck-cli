export default {
    name: 'help',
    description: 'Show help panel',
    aliases:[],
    run: async ({program, logger}) => {
        logger.figlet('ZECK CLI')
        program.outputHelp();
    }
};

