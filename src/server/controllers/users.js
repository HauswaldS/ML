import db from '../database/arrangoDb';

export default {
    async getAll(req, res) {
        const usersList = await db.getUsers(req.query);
        res.status(200).send(usersList)
    },
    async get(req, res) {
        const user = await db.getUser(req.params.userId);
        res.status(200).send(user)
    },
    async create(req, res) {
        const createdUser = await db.createUser(req.body);
        res.status(200).send(createdUser)
    },
    async update(req, res) {
        const updatedUser = await db.updateUser(req.body, req.params.userId);
        res.status(200).send(updatedUser)
    },
    async delete(req, res) {
        await db.deleteUser(req.params.userId);
        res.status(202).send()
    },
    async getUsersGroups(req, res) {
        const userGroups = await db.getUsersGroups();
        res.status(200).send(userGroups)
    }
}