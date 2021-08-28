import { appConfig } from "../config/config";
import shell from 'shelljs'

export class Template {
    private templatePath: string;

    constructor() {
        if(!appConfig.templatesPath) {
            throw new Error('undefinde calceus templates path')
        }
        this.templatePath = appConfig.templatesPath
    }

    public bootstrap(modules: Array<string>): void {
        this.setDataToTemplate(modules)
    }

    public setDataToTemplate(modules: Array<string>): void {
        // read data from template
        // todo process ejs/pug 
    }
}