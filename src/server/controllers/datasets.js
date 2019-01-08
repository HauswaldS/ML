import db from '../database/arrangoDb';
import processDatafile from '../utils/processDatafile';

export default {
    async getAll(req, res) {
        const datasetsList = await db.getDatasets(req.query);
        res.status(200).send(datasetsList);
    },
    async get(req, res) {
        const datasetsList = await db.getDataset(req.params.datasetId);
        res.status(200).send(datasetsList);
    },
    async create(req, res) {
        const fileProperties = processDatafile.getFileProperties(req.body.filename);
        const createdDataset = await db.createDataset(req.body);
        res.status(200).send(createdDataset);
    }
}