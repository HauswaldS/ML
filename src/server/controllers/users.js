import db from '../database/arrangoDb';
import {ManagementClient} from 'auth0';
import getDotenv from '../utils/dotenv';
import filesManager from '../utils/filesManager';

getDotenv();

const managementClient = () => {
    return new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials"
    });
};

export default {
    async getAll(req, res) {
        const usersList = await db.getUsers(req.query);
        res.status(200).send(usersList);
    },
    async get(req, res) {
        const user = await db.getUser(req.params.userId);
        res.status(200).send(user);
    },
    async getByEmail(req, res) {
        const user = await db.getUserByEmail(req.params.userEmail);
        res.status(200).send(user);
    },
    async create(req, res) {
        const createdUser = await db.createUser(req.body);

        await managementClient().createUser({
            email: req.body.email,
            password: req.body.password,
            connection: "Username-Password-Authentication",
            user_metadata: {id: createdUser._key}
        });

        res.status(200).send(createdUser);
    },
    async update(req, res) {
        const userId = req.params.userId;
        const userToUpdate = await db.getUser(userId);
        const updatedUser = await db.updateUser(req.body, userId);
        const auth0User = await managementClient().getUsers({q: `user_metadata.id:"${userId}"`});

        await managementClient().updateUser({id: auth0User[0].user_id}, {email: req.body.email})

        if (userToUpdate.avatar && (userToUpdate.avatar !== updatedUser.avatar)) {
            await filesManager.delete(userToUpdate.avatar, 'image')
        }

        res.status(200).send(updatedUser)
    },
    async delete(req, res) {
        const user = await db.getUser(req.params.userId);
        const auth0User = await managementClient().getUsers({q: `user_metadata.id:"${ req.params.userId}"`});

        await db.deleteUser(req.params.userId);
        await managementClient().deleteUser({id: auth0User[0].user_id});

        if (user.avatar) {
            await filesManager.delete(user.avatar, 'image');
        }

        res.status(202).send();
    },
    async getUsersGroups(req, res) {
        const userGroups = await db.getUsersGroups();
        res.status(200).send(userGroups);
    }
}