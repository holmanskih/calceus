import { Bootstraper } from './bootstraper'
import { Template } from './template'

export const dirPath = 'dirPath'
export const modules = 'modules'
export const projectName = 'projectName'

export class Builder {
    private dirPath: string;
    private modules: string;
    private projectName: string;
    private bootstraper: Bootstraper
    private template: Template

    // todo: change type !
    constructor(cliData: any) {
        this.dirPath = ''
        this.modules = ''
        this.projectName = ''
        this.parse(cliData)

        // fetch schema from json
        this.template = new Template()
        const schema = this.template.getCfg()
        if (!schema) {
            throw new Error('Project schema doesnt exists!')
        }

        // create bootstraper from schema
        this.bootstraper = new Bootstraper(this.dirPath, schema)
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