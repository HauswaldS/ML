import 'babel-polyfill';
import 'babel-core/register';
import express from 'express';

import getDotenv from './utils/dotenv';

import cors from 'cors';
import bodyParser from 'body-parser';
import {getUserFromRequest} from "./middlewares/auth.middleware";

import userController from './controllers/users';

getDotenv();

const PORT = process.env.PORT;
const app = express();

// setup middleware
app.use(bodyParser.json());
app.use('*', cors());
app.use(getUserFromRequest);
app.use('/public', express.static('public'));

// setup api routes
app.get('/api/users', userController.getAll);
app.get('/api/users/:userId', userController.get);
app.post('/api/users', userController.create);
app.put('/api/users/:userId', userController.update);
app.delete('/api/users/:userId', userController.delete);

app.get('/api/users-groups', userController.getUsersGroups);

app.listen(PORT, () => {
    console.log('Serveur listening on port: ' + PORT);
});

