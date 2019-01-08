import 'babel-polyfill';
import 'babel-core/register';
import express from 'express';

import getDotenv from './utils/dotenv';

import cors from 'cors';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy';
import {getUserFromRequest, isUserAuthenticated} from "./middlewares/auth.middleware";


import filesController from './controllers/files';
import usersController from './controllers/users';
import datasetsController from './controllers/datasets';

getDotenv();

const PORT = process.env.PORT;
const app = express();

// setup middleware
app.use(bodyParser.json());
app.use(busboy({highWaterMark: 2 * 1024 * 1024}));
app.use('*', cors());
app.use(getUserFromRequest);
app.use('/public', express.static('public'));

// TODO: DRY
//Files upload
app.post('/api/upload', filesController.upload);
app.delete('/api/upload/:filename', filesController.delete);

//Users
app.get('/api/users', usersController.getAll);
app.get('/api/users/:userId', usersController.get);
app.post('/api/users', usersController.create);
app.put('/api/users/:userId', usersController.update);
app.delete('/api/users/:userId', usersController.delete);

//Users groups
app.get('/api/users-groups', usersController.getUsersGroups);

//Datasets
app.get('/api/datasets', datasetsController.getAll);
app.get('/api/datasets/:datasetId', datasetsController.get);
app.post('/api/datasets', datasetsController.create);

app.listen(PORT, () => {
    console.log('Serveur listening on port: ' + PORT);
});

