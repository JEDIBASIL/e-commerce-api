import fs from "fs"
import util from "util"
import Handlebars from "handlebars"

class FileHandler {
    async templateReader(file: string, info?: any): Promise<string> {
        let templateFile = ""
        try {
            const readFile = util.promisify(fs.readFile);
            templateFile = await readFile(`${process.cwd()}/src/upload/templates/${file}`, "utf-8")
        } catch (err: unknown) {
            if (err instanceof Error) throw err
        }
        const template = Handlebars.compile(templateFile)
        return template({ ...info });
    }
    async deleteFile(path: string): Promise<boolean> {
        try {
            const unlinkFile = util.promisify(fs.unlink);
            unlinkFile(path)
        } catch (err: unknown) {
            if (err instanceof Error) throw err
        }
        return true
    }
}

export default FileHandler