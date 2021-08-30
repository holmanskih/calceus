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
    private name: string
    private templatePath: string;
    private jsonCfg: Array<TemplateModel>

    constructor(name: string) {
        this.name = name

        const calceusConfig = getCalceusPath()

        if(!calceusConfig) {
            throw new Error('undefinde calceus templates path')
        }
        this.templatePath = calceusConfig

        console.log('reading the template configuration...');
        this.jsonCfg = IO.readJSONConfig<Array<TemplateModel>>(this.templatePath)
    }

    public getTemplateByKey = (): TemplateModel => {
        return this.jsonCfg.filter((cfgItem) => cfgItem.key === this.name)[0]
    }

    public moveToBootstrap = (projectPath: string) => {
        
        const template = this.getTemplateByKey()
        if(template === undefined) {
            throw new Error(`template with key: ${this.name} was not found in schema`)
        }

        const templatePath = getTemplateFilePath(template.path)
        const dirPath = IO.formRootDirPathFromFile(projectPath, template.name)
        
        IO.copyFile(templatePath, path.join(dirPath, template.name))
    }
}