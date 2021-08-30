import path from "path/posix"

export enum RunMode {
    Debug,
    Prod
}

type AppConfig = {
    // calceus
    calceusPath: string,
    calceusConfigPath: string

    mode: RunMode,

    //schema
    schemaPath: string,

    // templates
    templatesPath: string,
}

export const appConfig: AppConfig = {
    // calceus
    calceusPath: ".calceus",
    calceusConfigPath: "calceus.json",

    // schema
    schemaPath: "schema/schema.json",

    // templates
    templatesPath: "templates",

    mode: RunMode.Prod, // debug or prod
}

// path utils
export const getSchemaPath = (): string => {
    return path.join(appConfig.calceusPath, appConfig.schemaPath)
}

export const getSchemaFilePath = (schemaFilePath: string): string => {
    return path.join(appConfig.calceusPath, 'schema', schemaFilePath)

}

export const getTemplatesPath = (): string => {
    return path.join(appConfig.calceusPath, appConfig.templatesPath)
}

export const getTemplateFilePath = (templateFilePath: string): string => {
    return path.join(appConfig.calceusPath, templateFilePath)
}

export const getCalceusPath = (): string => {
    return path.join(appConfig.calceusPath, appConfig.calceusConfigPath)
}