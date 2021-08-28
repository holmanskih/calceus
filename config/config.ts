enum RunMode {
    Debug,
    Prod
}

type AppConfig = {
    projectTemplatePath: string,
    mode: RunMode,
    templatesPath: string
}
export const appConfig: AppConfig = {
    projectTemplatePath: "config/template.json",
    mode: RunMode.Prod, // debug or prod
    templatesPath: "./calceus/template"
}