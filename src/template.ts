import { IO } from "./util/io.js";
import path from 'path'
import {cfg} from '../config.js'

export type TemplateModel = {
    key: string,
    path: string,
    name: string
    modules: Array<string>
}

export class Template {
    private name: string
    private jsonCfg: Array<TemplateModel>

    constructor(name: string) {
        this.name = name

        console.log('reading the template configuration...');
        this.jsonCfg = IO.readJSONConfig<Array<TemplateModel>>(cfg.modulesConfigurationPath)
        console.log('reading the template configuration end...');
    }

    public static getTemlateFilePath = (rawTemplateFilePath: string): string => {
        return path.join(cfg.templatePath, rawTemplateFilePath)
    }

    public getTemplateByKey = (): TemplateModel => {
        return this.jsonCfg.filter((cfgItem) => cfgItem.key === this.name)[0]
    }

    public moveToBootstrap = (projectPath: string) => {
        
        const template = this.getTemplateByKey()
        if(template === undefined) {
            throw new Error(`template with key: ${this.name} was not found in schema`)
        }

        const templatePath = Template.getTemlateFilePath(template.path)
        const dirPath = IO.formRootDirPathFromFile(projectPath, template.name)
        
        IO.copyFile(templatePath, path.join(dirPath, template.name))
    }
}