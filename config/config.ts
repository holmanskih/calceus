import path from "path/posix"

export enum RunMode {
    Debug,
    Prod
}

type AppConfig = {
    calceusPath: string,

    mode: RunMode,

    //schema
    schemaPath: string,

    // templates
    templatesPath: string,
    templatesConfigPath: string

}

export const appConfig: AppConfig = {
    calceusPath: "/Users/holmanskih/Personal/calceus/.calceus",
    schemaPath: "schema/template.json",
    templatesPath: "templates",
    templatesConfigPath: "./templates.js",
    mode: RunMode.Prod, // debug or prod
}

// path utils
export const getSchemaPath = (): string => {
    return path.join(appConfig.calceusPath, appConfig.schemaPath)
}

export const getTemplatesPath = (): string => {
    return path.join(appConfig.calceusPath, appConfig.templatesPath)
}