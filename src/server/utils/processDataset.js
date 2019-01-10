import fs from 'fs';
import path from 'path';
import getDotenv from './dotenv';

getDotenv()

// Works only with CSV files for now
export default {
    async getDatasetProperties(fileName) {
        return await this.readFile(fileName);
    },
    readFile(fileName) {
        let rootDirPath = path.dirname(process.mainModule.filename),
            filePath = `${rootDirPath}/${process.env.UPLOAD_PATH}/datasets/${fileName}`;

        return new Promise((resolve, reject) => {
            let fileStream = fs.createReadStream(filePath),
                entries = 0,
                columnNames = [],
                format = fileName.split('.')[1];

            fileStream.on('data', (chunk) => {
                let rows = this.getRows(chunk.toString());

                if (!columnNames.length) {
                    columnNames = rows.shift();
                }

                if (rows[0].length !== columnNames.length) {
                    rows.shift();
                }

                entries += rows.length;
            });
            fileStream.on('end', () => {
                fs.stat(filePath, (err, stats) => {
                    if (err) reject(err);
                    resolve({
                        columnNames,
                        entries,
                        format,
                        fileSize: stats.size,
                    });
                })
            });
            fileStream.on('error', (err) => {
                console.log(err);
                reject(err);
            })
        })
    },
    getRows(chunk) {
        return chunk.split('\n').map(row => row.split(/(?!\s),(?!\s)/));
    },

}