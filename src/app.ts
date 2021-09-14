import { Schema } from './schema.js'
import { Bootstraper } from './bootstraper.js'
import { cfg } from '../config/config.js'
import { CliOpt } from '../cmd/build.js';
import { getModulesPath } from '../constants.js';

export class App {
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

        const schema = new Schema(cfg.schemaConfigurationPath)
        if (!schema) {
            throw new Error('Project schema doesnt exists!')
        }
        console.log("init schema");
        

        const schemaModel = schema.parseFromConfig()
        if(schemaModel == undefined) {
            throw new Error('Project schema model is undefined!')
        }

        this.bootstraper = new Bootstraper(this.dirPath, schemaModel, this.modules)
        console.log('bootstraper', this.bootstraper);
        
    }

    // todo: change type !
    private parse(cliData: any) {
        this.dirPath = cliData[CliOpt.DirPath]
        this.modules = cliData[CliOpt.Modules]
        this.projectName = cliData[CliOpt.ProjectName]
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