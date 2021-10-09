import path from "path"
import os from "os"

export const CWD_PATH_DELIMITER = "."

// template key names
export const TEMPLATE_KEY_DEPENDENCIES = "dependencies"
export const TEMPLATE_KEY_DEV_DEPENDENCIES = "devDependencies"

// directory path
export const MODULES_PATH_NAME = ".calceus"
export const MODULES_CONFIG_FILE_PATH = "calceus.json"

// templates
export const MODULES_TEMPLATES_PATH = "templates"

// schema
export const MODULES_SCHEMA_PATH = "schema"
export const MODULES_SCHEMA_CONFIG_FILE_PATH = "schema/schema.json"

// modules
export const getModulesPath = (): string => {
    return path.join(os.homedir(), MODULES_PATH_NAME)
}

export const getModulesConfigFilePath = (): string => {
    return path.join(os.homedir(), MODULES_PATH_NAME, MODULES_CONFIG_FILE_PATH)
}

// shema
export const getSchemaPath = (): string => {
    return path.join(os.homedir(), MODULES_PATH_NAME, MODULES_SCHEMA_PATH)
}

export const getSchemaConfigPath = (): string => {
    return path.join(os.homedir(), MODULES_PATH_NAME, MODULES_SCHEMA_CONFIG_FILE_PATH)
}

// template
export const getTemplatesPath = (): string => {
    return path.join(os.homedir(), MODULES_PATH_NAME, MODULES_TEMPLATES_PATH)
}
