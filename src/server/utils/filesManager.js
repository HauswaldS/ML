import fs from 'fs';
import path from "path";
import shortid from "shortid";
import getDotEnv from './dotenv';

getDotEnv();

export default {
    upload(file, extension, type) {
        return new Promise((resolve, reject) => {
            const rootDirPath = path.dirname(process.mainModule.filename);
            const filename = `${shortid.generate()}${extension}`;
            const filePath = `${rootDirPath}/${process.env.UPLOAD_PATH}/${type}s/${filename}`;
            const writeFileStream = fs.createWriteStream(filePath);

            file.pipe(writeFileStream);

            writeFileStream.on('finish', () => {
                resolve(filename);
            });

            writeFileStream.on('error', (err) => {
                reject(err);
            });
        })
    },
    delete(filename, type) {
        return new Promise((resolve, reject) => {
            const rootDirPath = path.dirname(process.mainModule.filename);
            const filePath = `${rootDirPath}/${process.env.UPLOAD_PATH}/${type}s/${filename}`;

            fs.access(filePath, (err) => {
                if (err) {
                    console.log(err);
                    resolve()
                } else {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.log(err);
                            resolve()
                        } else {
                            resolve()
                        }
                    })
                }
            })
        })
    }
}