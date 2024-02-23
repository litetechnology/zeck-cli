import inquirer from "inquirer";

import translactions from "./translactions.js";

const prompt = async (prompts, options={}) => {

    const translaction = translactions(null, { errors: true });

    const validateNotAllowed= (value) => value ? true : translaction.validateNotAllowed;
    prompts = prompts.map(({ validate=validateNotAllowed, prefix='(zeck)', type='input', message, name }, index) => ({ validate, prefix, type, message, name: (name || index.toString()) }) );
    let answers;
    answers = await inquirer.prompt(prompts);
    return answers;
};

export default prompt;