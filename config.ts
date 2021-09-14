import { getModulesConfigFilePath, getModulesPath, getSchemaConfigPath, getSchemaPath, getTemplatesPath } from "./constants.js"
import fs from 'fs'

export enum RunMode {
    Debug,
    Prod
}

export type ConfigOpts = {
    // directory path configuration
    modulesPath: string
    schemaPath: string
    templatePath: string

    // file path configuration
    schemaConfigurationPath: string
    modulesConfigurationPath: string

    mode: RunMode,
}

export const cfg: ConfigOpts = {
    modulesPath: getModulesPath(),
    schemaPath: getSchemaPath(),
    schemaConfigurationPath: getSchemaConfigPath(),
    modulesConfigurationPath: getModulesConfigFilePath(),
    templatePath: getTemplatesPath(),
    mode: RunMode.Prod
}

export const validateConfig = (): boolean => {
    console.log("validating configuration...");
    console.log("modulesPath", cfg.modulesPath);
    console.log("schemaPath", cfg.schemaPath);
    console.log("templatePath", cfg.templatePath);
    
    return fs.existsSync(cfg.modulesPath) &&
        fs.existsSync(cfg.schemaPath) && 
        fs.existsSync(cfg.templatePath)
}