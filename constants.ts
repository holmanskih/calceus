import path from "path"
import os from "os"

const MODULES_PATH_NAME = ".calceus"

export const getModulesPath = (): string => {
    // todo: add system for both unix and windows platforms 
    return path.join(os.homedir(), MODULES_PATH_NAME)
}