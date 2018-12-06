const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

/*
 * getDotenv()
* processes .env file (if it exists). Sets process.env[VARS] as a
* side-effect.
*
* Returns true.
*/
module.exports = () => {
    const myConfig = {silent: true};

    if (process.env.NODE_ENV !== 'production') {
        myConfig.path = '../../.env.dev';
    }
    else {
        myConfig.path = '../../.env.prod';
    }
    const myEnv = dotenv.config(myConfig);

    dotenvExpand(myEnv);
    return true
};
