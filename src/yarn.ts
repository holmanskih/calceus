import shell from 'shelljs'
import { IO } from './util/io.js'

export class Yarn {
    public static yarn(): void {
        shell.exec('yarn')
    }

    public static add(pkg: string): void {
        shell.exec(`yarn add ${pkg}`)
    }

    public static addDevelopment(pkg: string): void {
        shell.exec(`yarn add -D ${pkg}`)
    }

    public static addPkgList(pkgData: Array<string>): void {
        pkgData.forEach(pkg => Yarn.add(pkg))
    }

    public static addDevelopmentPkgList(pkgDevelopmentData: Array<string>): void {
        pkgDevelopmentData.forEach(pkg => Yarn.addDevelopment(pkg))
    }

    public static start(path: string, pkgData: Array<string>, pkgDevelopmentData: Array<string>): void {
        IO.navigate(path)
        this.yarn()
        this.addPkgList(pkgData)
        this.addDevelopmentPkgList(pkgData)
    }
}