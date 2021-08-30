import { getCalceusPath, getTemplateFilePath } from "../config/config.js";
import { IO } from "./io.js";
import path from 'path'

export type TemplateModel = {
    key: string,
    path: string,
    name: string
    modules: Array<string>
}

export class Template {
    private templatePath: string;
    private jsonCfg: Array<TemplateModel>

    constructor() {
        const calceusConfig = getCalceusPath()

        if(!calceusConfig) {
            throw new Error('undefinde calceus templates path')
        }
        this.templatePath = calceusConfig

        console.log('reading the template configuration...');
        this.jsonCfg = IO.readJSONConfig<Array<TemplateModel>>(this.templatePath)
    }

    private getTemplateByKey = (key: string): TemplateModel => {
        return this.jsonCfg.filter((cfgItem) => cfgItem.key === key)[0]
    }

    public moveToBootstrap = (projectPath: string, key: string) => {
        
        const template = this.getTemplateByKey(key)
        if(template === undefined) {
            throw new Error(`template with key: ${key} was not found in schema`)
        }

        const templatePath = getTemplateFilePath(template.path)
        const dirPath = IO.formRootDirPathFromFile(projectPath, template.name)
        
        IO.copyFile(templatePath, path.join(dirPath, template.name))
    }
}