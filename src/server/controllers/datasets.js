import db from '../database/arrangoDb';
import processDataset from '../utils/processDataset';
import filesManager from '../utils/filesManager';

export default {
    async getAll(req, res) {
        const datasetsList = await db.getDatasets(req.query);
        res.status(200).send(datasetsList);
    },
    async get(req, res) {
        const dataset = await db.getDataset(req.params.datasetId);
        res.status(200).send(dataset);
    },
    async create(req, res) {
        const {format, entries, columnNames, fileSize} = await processDataset.getDatasetProperties(req.body.fileName);
        const dataset = {
            ...req.body,
            format,
            entries,
            columnNames,
            fileSize
        };
        const createdDataset = await db.createDataset(dataset);

        res.status(200).send(createdDataset);
    },
    async update(req, res) {
        const datasetId = req.params.datasetId;
        const datasetToUpdate = await db.getDataset(datasetId);

        let payload;

        if (datasetToUpdate.fileName !== req.body.fileName) {
            await filesManager.delete(datasetToUpdate.fileName, 'dataset');
            const {format, entries, columnNames, fileSize} = await processDataset.getDatasetProperties(req.body.fileName);
            payload = {...datasetToUpdate, format, entries, columnNames, fileSize, ...req.body};
        } else {
            payload = {...datasetToUpdate, ...req.body};
        }

        const datasetUpdated = await db.updateDataset(payload, datasetId);

        res.status(200).send(datasetUpdated);
    },
    async delete(req, res) {
        const dataset = await db.getDataset(req.params.datasetId);

        await db.deleteDataset(req.params.datasetId);
        await filesManager.delete(dataset.fileName, 'dataset');

        res.status(202).send();
    }
}