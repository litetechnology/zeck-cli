export default {
    name: 'version',
    description: 'Show zeck version',
    aliases:[],
    run: async ({ json }) => {
        const project = json.load('../package.json');
        console.log(project.version);
    }
};

