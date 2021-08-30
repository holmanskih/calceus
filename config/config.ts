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
    schemaPath: "schema/schema.json",
    templatesPath: "templates",
    templatesConfigPath: "calceus.json",
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