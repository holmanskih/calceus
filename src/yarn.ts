import shell from 'shelljs'
import { IO } from './io.js'

export class Yarn {
    public static yarn(): void {
        shell.exec('yarn')
    }

    public static add(pkg: string): void {
        shell.exec(`yarn add ${pkg}`)
    }

    public static addPkgList(pkgData: Array<string>): void {
        pkgData.forEach(pkg => Yarn.add(pkg))
    }

    public static start(path: string, pkgData: Array<string>): void {
        IO.navigate(path)
        this.yarn()
        this.addPkgList(pkgData)
    }
}