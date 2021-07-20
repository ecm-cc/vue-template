/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
const axios = require('axios');
const getHTTPOptions = require('@ablegroup/httpoptions');
const login = require('@ablegroup/login');
const configLoader = require('../../global.config');

/**
 * Searches all process instances for their inquiries and groups them
 * @param {Object<>} req User request to the backend
 * @param {Array<string>} processIds List of process instances
 * @returns {Array<Object<String>>} All process variables in an "inquiry"-Object
 */
async function groupInquiries(req, processIds) {
    const inquiries = [];
    const config = configLoader.load(req.tenantId);
    let options = getHTTPOptions(req);
    delete options.headers.Cookie;

    // eslint-disable-next-line no-restricted-syntax
    for (const i in processIds) {
        options.headers.Authorization = `Bearer ${await login(config.host, config.serviceUser)}`;
        const processId = processIds[i];
        const inquiry = {};
        options.url = `${config.host}/process/instances/${processId}/historicVariables`;
        const response = await axios(options);
        options = getHTTPOptions(req);
        const inquiryData = response.data.variables;
        inquiry.messages = concatMessages(inquiryData);
        inquiry.recipient = inquiryData.wfRecipient ? await getPersonData(inquiryData.wfRecipient.values[0], options, config) : '';
        inquiry.applicant = inquiryData.dv_initiator ? await getPersonData(inquiryData.dv_initiator.values[0], options, config) : '';
        inquiry.timestamps = inquiryData.wfTimestamps ? inquiryData.wfTimestamps.values : '';
        inquiry.reason = inquiryData.wfReason ? inquiryData.wfReason.values[0] : '';
        const dmsDocument = inquiryData.dv_attachment.values[0].substring(12);
        inquiry.document = {
            caption: await getDocumentCaption(dmsDocument, options, config),
            href: config.host + dmsDocument,
        };
        inquiries.push(inquiry);
    }
    inquiries.sort((a, b) => b.timestamps[0] - a.timestamps[0]);
    return inquiries;
}

function concatMessages(inquiryData) {
    let messages;
    if (inquiryData.wfMessages) {
        messages = inquiryData.wfMessages.values;
    }
    if (inquiryData.wfMessages_1) {
        messages = messages.map((m, i) => m + inquiryData.wfMessages_1.values[i]);
    }
    if (inquiryData.wfMessages_2) {
        messages = messages.map((m, i) => m + inquiryData.wfMessages_2.values[i]);
    }
    if (inquiryData.wfMessages_3) {
        messages = messages.map((m, i) => m + inquiryData.wfMessages_3.values[i]);
    }
    return messages;
}

async function getPersonData(userId, options, config) {
    const httpOptions = options;
    httpOptions.url = `${config.host}${userId.substring(11)}`;
    const personData = await axios(httpOptions);
    return personData.data;
}

/**
 * Get the caption for a given document
 * @param {string} dmsDocument URL to a DMS document
 * @param {Object} options HTTP options
 * @param {Object} config Configuration for the app
 * @returns {string} caption
 */
async function getDocumentCaption(dmsDocument, options, config) {
    const httpOptions = options;
    httpOptions.url = `${config.host}${dmsDocument}`;
    const response = await axios(options);
    return response.data.caption;
}

/**
 * @module modules/groupInquiry
 * Searches all process instances for their inquiries and groups them
 */
module.exports.group = groupInquiries;
