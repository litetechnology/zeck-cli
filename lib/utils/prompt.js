import inquirer from "inquirer";

import translactions from "./translactions.js";

const prompt = async (prompts, options={}) => {

    const translaction = translactions(null, { errors: true });

    const validateNotAllowed= (value) => value ? true : translaction.validateNotAllowed;
    prompts = prompts.map(({ validate=validateNotAllowed, prefix='(zeck)', type='input', message, name, choices=[] }, index) => ({ validate, prefix, type, message, name: (name || index.toString()), choices }) );
    let answers;
    answers = await inquirer.prompt(prompts);
    return answers;
};

export default prompt;