import multer, { DiskStorageOptions, Multer } from "multer"
import path from "path";
import { v4 } from "uuid";
import HttpException from "../exceptions/HttpException";
import logger from "../utils/logger";
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
        const upload = this.upload().single("file")
        logger.info(upload.toString())
    }
    public upload(): Multer {
        const upload = multer({
            storage: this.storage as multer.StorageEngine,
            fileFilter: function (req, file, callback) {
                var ext = path.extname(file.originalname);
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    return callback(new HttpException(406, 'Only images are allowed'))
                }
            }, limits: {
                fileSize: 1024 * 1024,
            },
        })
        console.log("upload")
        return upload
    }
}

export default MulterUpload;