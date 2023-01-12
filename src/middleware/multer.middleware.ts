import multer, { DiskStorageOptions, Multer, diskStorage } from "multer"
import path from "path";
import { v4 } from "uuid";
import HttpException from "../exceptions/HttpException";
class MulterUpload {
    private storage: DiskStorageOptions;
    constructor(folder: string) {
        this.storage = {
            destination: function (req, file, cb) {
                cb(null, `${process.cwd()}/src/upload/${folder}`)
            },
            filename: function (req, file, cb) {
                cb(null, v4() + path.extname(file.originalname))
            },
        }
    }
    public upload(): Multer {
        const upload = multer({
            storage: diskStorage(this.storage),
            fileFilter: function (req, file, next) {
                var ext = path.extname(file.originalname);
                if (ext !== '.html' && ext !== '.hbs') {
                    return next(new HttpException(406, 'Only images are allowed'))
                }
                next(null, true)
            }, limits: {
                fileSize: 1024 * 1024,
            },
        })
        return upload
    }
}

export default MulterUpload;