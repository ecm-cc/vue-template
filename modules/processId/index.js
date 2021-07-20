/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const axios = require('axios');
const login = require('@ablegroup/login');
const configLoader = require('../../global.config');

/**
 * Gets all process instances for the given business key(s)
 * @param {Object<>} req User request to the backend
 * @param {String | Array<String>} [businessKey] documentID to be searched
 * @returns {Array<String>} List of instance ids
 */
module.exports = async (req, businessKey = '') => {
    const config = configLoader.load(req.tenantId);
    const processes = await getAllProcesses(config);
    let instances = [];
    for (const i in businessKey) {
        const filteredInstances = await getProcessByBusinessKey(config, req, processes, businessKey[i]);
        instances = instances.concat(filteredInstances);
    }
    instances = instances.map((instance) => instance.id);
    return instances;
};

/**
 * Gets all processes for a tenant
 * @param {Object} config Configuration for the app
 * @param {Object<>} req User request to the backend
 * @returns {Array<Object<>>} List of processes and versions
 */
async function getAllProcesses(config) {
    const options = {
        url: `${config.host}/process/processes`,
        headers: {
            Accept: 'application/hal+json',
            Authorization: `Bearer ${await login(config.host, config.serviceUser)}`,
        },
    };
    const response = await axios(options);
    return response.data._embedded;
}

/**
 * Gets all process instances for a given business key
 * @param {Object} config Configuration for the app
 * @param {Object<>} req User request to the backend
 * @param {Array<>} processes List of all processes
 * @param {string} businessKey business key to be searched
 * @returns {Array<Object>} List of all found instances
 */
async function getProcessByBusinessKey(config, req, processes, businessKey) {
    const options = {
        url: `${config.host}/process/instances`,
        headers: {
            Accept: 'application/hal+json',
            Authorization: `Bearer ${await login(config.host, config.serviceUser)}`,
        },
        method: 'post',
        data: {
            activity: null,
            businessKey,
            processId: [config.processId],
            state: ['ENDED'],
            version: [],
        },
    };
    const inquiryProcess = processes.processes.find((process) => process.key === config.processId);
    inquiryProcess.versions.forEach((version) => options.data.version.push(version.number));
    const response = await axios(options);
    return response.data._embedded.instances;
}
