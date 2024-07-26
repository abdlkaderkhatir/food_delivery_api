import multer from "multer";
import slugify from "slugify";

export class Utils {

    static getCurrentDate(): string {
        // return new Date().toLocaleDateString(
        //     'en-US', {
        //         year: 'numeric',
        //         month: '2-digit',
        //         day: '2-digit'
        //     }
        // );
        // i need algeria date format
        return new Date().toLocaleString('en-US', {
            timeZone: 'Africa/Algiers',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        // what is the difference between toLocaleDateString and toLocaleString
        // toLocaleDateString() returns the date portion of a Date object as a string, using locale conventions.
        // toLocaleString() returns a string with a language sensitive representation of this date.
    }

    static getFormattedDate(date: Date): string {
        return date.toLocaleDateString();
    }

    static getFormattedTime(date: Date): string {
        return date.toLocaleTimeString();
    }

    // multer file filter
    static fileFilter(req: any, file: any, cb: any) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('File type not supported'));
        }
    }

    // multer disk storage

    static storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/uploads/'); // save file in uploads folder you can change it as you want   cb(null, './src/uploads/' + file.originalname);

        },
        filename: function (req, file, cb) {
            //    const ext = file.mimetype.split('/')[1];
            //    const filename = `${slugify(file.originalname, { lower: true, strict: true })}-${Date.now()}.${ext}`;
            //    cb(null, filename);
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    });

    // multer upload

    static upload = multer({
        storage: Utils.storage,
        limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
        fileFilter: Utils.fileFilter
    });
}

// function slugify(originalname: string, arg1: { lower: boolean; strict: boolean; }) {
//     throw new Error("Function not implemented.");
// }
