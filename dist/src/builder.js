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
    // todo: add try catch
    bootstrap() {
        // create initial dir
        this.createBaseDir();
        // read template
        const template = new Template();
        const templateCfg = template.getCfg();
        if (templateCfg) {
            const schema = templateCfg.files;
            console.log(schema);
            // create fs
            for (let i = 0; i < schema.length; i++) {
                const schemaNode = schema[i];
                console.log('fsNode', schemaNode);
                Template.createNode(schemaNode);
            }
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
