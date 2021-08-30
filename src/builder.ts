import { Schema } from './schema.js'
import { Bootstraper } from './bootstraper.js'
import { Template } from './template.js'
import { appConfig, getSchemaPath } from '../config/config.js'

export const dirPath = 'dirPath'
export const modules = 'modules'
export const projectName = 'projectName'

export class Builder {
    private dirPath: string;
    private modules: string;
    private projectName: string;
    private bootstraper: Bootstraper

    // todo: change type !
    constructor(cliData: any) {
        this.dirPath = ''
        this.modules = ''
        this.projectName = ''
        this.parse(cliData)

        const schemaPath = getSchemaPath()
        const schema = new Schema(schemaPath)
        if (!schema) {
            throw new Error('Project schema doesnt exists!')
        }

        const schemaModel = schema.getCfg()
        if(schemaModel == undefined) {
            throw new Error('Project schema model is undefined!')
        }

        this.bootstraper = new Bootstraper(this.dirPath, schemaModel)
    }

    // todo: change type !
    private parse(cliData: any) {
        this.dirPath = cliData[dirPath]
        this.modules = cliData[modules]
        this.projectName = cliData[projectName]
        console.log(this);
    }

    getModules() {
        return this.modules
    }

    getDirPath() {
        return this.dirPath
    }

    // todo: add try catch
    bootstrap() {
        this.bootstraper.bootstrap()
    }
}