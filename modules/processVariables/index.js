const axios = require('axios');
const getHTTPOptions = require('@ablegroup/httpoptions');

/**
 * Loads all variables to a given process
 * @param {string} variablesUri URL to get the process variables
 * @param {Object} cookie HTTP Cookie for authentification
 * @param {Object} config Configuration for the app
 * @returns {Object} All variables
 */
async function load(variablesUri, req, config) {
    const variables = {
        process: {},
        applicant: {},
        recipient: {},
    };
    const httpOptions = getHTTPOptions(req);
    const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Berlin',
    };
    httpOptions.url = `${config.host}${variablesUri}`;
    const processVariables = await axios(httpOptions);
    variables.process = processVariables.data.variables;
    variables.applicant = await getPersonData(variables.process.dv_initiator, httpOptions, config);
    variables.recipient = await getPersonData(variables.process.wfRecipient, httpOptions, config);
    variables.dates = variables.process.wfTimestamps.map((x) => new Date(parseInt(x, 10)).toLocaleString('de-DE', dateOptions));
    return variables;
}

/**
 * Gets all scim information for a given user
 * @param {string} userId ID of the user
 * @param {Object} options HTTP options
 * @param {Object} config Configuration for the app
 */
async function getPersonData(userId, options, config) {
    const httpOptions = options;
    httpOptions.url = `${config.host}${userId.substring(11)}`;
    const personData = await axios(httpOptions);
    return personData.data;
}

/**
 * Saves a variable into a given process
 * @param {string} variablesUri URL to get the process variables
 * @param {string} variableName Name of the variable
 * @param {string} variableValue New value of the variable
 * @param {Object} cookie HTTP Cookie for authentification
 * @param {Object} config Configuration for the app
 */
async function save(variablesUri, variableName, variableValue, req, config) {
    const options = getHTTPOptions(req);
    options.url = `${config.host}${variablesUri}`;
    options.method = 'put';
    options.data = {
        variables: {
            [variableName]: variableValue,
        },
    };
    try {
        await axios(options);
    } catch (err) {
        console.error(err);
        console.error(err.message);
        throw err;
    }
}

/**
 * @module modules/processVariables
 * Loads or saves variables in a process
 */
module.exports = {
    load,
    save,
};
