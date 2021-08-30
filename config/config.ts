export enum RunMode {
    Debug,
    Prod
}

type AppConfig = {
    calceusPath: string,
    projectTemplatePath: string,
    mode: RunMode,
    templatesPath: string,
    templatesConfigPath: string
}

export const appConfig: AppConfig = {
    calceusPath: "/Users/holmanskih/Personal/calceus/.calceus",
    projectTemplatePath: "schema/template.js",
    templatesPath: "templates",
    templatesConfigPath: "./templates.js",
    mode: RunMode.Prod, // debug or prod
}