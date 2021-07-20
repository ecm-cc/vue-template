const axios = require('axios');
const getHTTPOptions = require('@ablegroup/httpoptions');

/**
 * @module modules/notes
 * Posts a given text to the DMS notes
 * @param {string} documentId ID of the document
 * @param {string} text Text for the notes
 * @param {Object} cookie HTTP Cookie for authentification
 * @param {Object} config Configuration for the app
 */
module.exports = async (documentId, text, req, config) => {
    const options = getHTTPOptions(req);
    options.url = `${config.host}/dms/r/${config.repositoryId}/o2m/${documentId}/n`;
    options.method = 'post';
    options.data = {
        text,
    };
    try {
        await axios(options);
    } catch (err) {
        throw err.response.data.details;
    }
};
