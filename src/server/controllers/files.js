import filesManager from '../utils/filesManager';

export default {
    upload(req, res, next) {
        const type = req.params.type;
        req.pipe(req.busboy);
        req.busboy.on('file', async (fieldname, file, extension) => {
            let filename = await filesManager.upload(file, extension, type);
            res.send({filename});
        })
    },
    async delete(req, res, next) {
        const filename = req.params.filename;
        const type  = req.params.type;
        if (!filename) {
            res.send(202);
        } else {
            await filesManager.delete(filename, type);
            res.send(202);
        }
    }
}