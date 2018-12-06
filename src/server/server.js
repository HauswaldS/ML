import 'babel-polyfill';
import 'babel-core/register';
import express from 'express';

import getDotenv from './utils/dotenv';

import cors from 'cors';
import bodyParser from 'body-parser';
import {getUserFromRequest} from "./middlewares/auth.middleware";

getDotenv();

const {PORT = 3000} = process.env.PORT;
const app = express();

// setup middleware
app.use(bodyParser.json());
app.use('*', cors());
app.use(getUserFromRequest)

app.use('/static', express.static('static'));

app.listen(PORT, () => {
    console.log('Serveur listening on port: ' + PORT);
});

