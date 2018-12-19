import shortid from 'shortid';
import fs from 'fs';

export default {
    upload(req, res, next) {
        req.pipe(req.busboy);
        req.busboy.on('file', (fieldname, file, extension) => {
            const filename = `${shortid.generate()}${extension}`;
            const writeFileStream = fs.createWriteStream(`./public/uploads/${filename}`);
            file.pipe(writeFileStream);

            writeFileStream.on('finish', () => {
                console.log('All writes are now complete.');
                res.send({filename})
            });
            writeFileStream.on('error', (err) => {
                console.log('error', err);
            });

        })
    },
    delete(req, res, next) {
        const filename = req.params.filename;
        if (!filename) {
            res.send(202);
        } else {
            const filePath = `./public/uploads/${filename}`;
            fs.access(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.send(202)
                } else {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.log(err);
                            res.send(202)
                        } else {
                            res.send(202)
                        }
                    })
                }
            })
        }
    }
}