import fs from 'fs';
import { Template } from './template.js';
export const dirPath = 'dirPath';
export const modules = 'modules';
export const projectName = 'projectName';
export class Builder {
    // todo: change type !
    constructor(cliData) {
        this.dirPath = '';
        this.modules = '';
        this.projectName = '';
        this.parse(cliData);
    }
    // todo: change type !
    parse(cliData) {
        this.dirPath = cliData[dirPath];
        this.modules = cliData[modules];
        this.projectName = cliData[projectName];
        console.log(this);
    }
    getModules() {
        return this.modules;
    }
    getDirPath() {
        return this.dirPath;
    }
    bootstrap() {
        const template = new Template();
        const templateCfg = template.getCfg();
        if (templateCfg) {
            console.log(templateCfg.files);
            return;
        }
        console.log('Unexpected template boostrat error. Template data is undefined!');
    }
    createBaseDir() {
        let path = this.dirPath;
        if (path) {
            if (fs.existsSync(path)) {
                path += "_copy";
                console.log(`Such directory already exists`);
            }
            fs.mkdirSync(path, { recursive: true });
            console.log(`We created the new project with ${path} name`);
        }
        else {
            console.log(`You entered empy path name: ${path}.`);
        }
    }
}
