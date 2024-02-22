import { readFileSync, writeFileSync} from 'node:fs';

const update = (path, content, options={ rewrite: false, new: false }) => {
    try {
        const file = readFileSync(path, { encoding: 'utf-8' });
        const currentContent = JSON.parse(file);
        content = options.rewrite ? content : { ...currentContent, ...content };
        writeFileSync(path, JSON.stringify(content, null, 2));
        return options.new ? content : {};
    } catch (err) {
        console.log(err)
    }
}

const load = (path, options={ update: false }) => {
    try {
        const file = readFileSync(path, { encoding: 'utf-8' });
        const content = JSON.parse(file);
        const updateLoadedContent = (content, options) => {
            return update(path, content, options);
        };
        return options.update ? { content, update: updateLoadedContent } : content;
    } catch (err){
        console.log(err)
    }

}

export default {
    update,
    load
}