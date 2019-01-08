import fs from 'fs';
import path from 'path';
import getDotenv from './dotenv';

getDotenv()

export default {
    getFileProperties(filename) {
        let rootDirPath = path.dirname(process.mainModule.filename);
        this.readFile(`${rootDirPath}/${process.env.UPLOAD_PATH}/${filename}`)
    },

    readFile(filePath) {
        let fileStream = fs.createReadStream(filePath);
        fileStream.on('data', (chunk) => {
            console.log(chunk.toString().split('\n'));
        })
    },

    calculateNumberOfEntires() {

    }

}