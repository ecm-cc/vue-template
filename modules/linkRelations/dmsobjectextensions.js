const configLoader = require('../../global.config');
const remoteConfigLoader = require('../configloader');

module.exports = async (appName, basePath, tenantID) => {
    const config = configLoader.load(tenantID);
    const inquiryConfig = await getRemoteConfig('inquiry', tenantID, appName);
    const overviewConfig = await getRemoteConfig('overview', tenantID, appName);
    return {
        extensions: [
            {
                id: 'inquiryprocessPers',
                activationConditions: [
                    {
                        propertyId: 'repository.id',
                        operator: 'or',
                        values: [config.repositoryId],
                    },
                    {
                        propertyId: 'dmsobject.property_category',
                        operator: 'or',
                        values: config.personalIDs,
                    },
                    {
                        propertyId: 'user.idp.group_id',
                        operator: 'or',
                        values: config.personalGroupIDs,
                    },
                ],
                captions: [{
                    culture: 'de',
                    caption: 'Rückfrage erstellen',
                },
                {
                    culture: 'en',
                    caption: 'Create inquiry',
                }],
                context: 'DmsObjectDetailsContextAction',
                uriTemplate: `${basePath}/create?id={dmsobject.property_document_id}`,
                iconUri: `${basePath}/public/icon-inquiry.png`,
            },
            {
                id: 'inquiryprocess',
                activationConditions: [
                    {
                        propertyId: 'repository.id',
                        operator: 'or',
                        values: [config.repositoryId],
                    },
                    {
                        propertyId: 'dmsobject.property_category',
                        operator: 'or',
                        values: getCategories(inquiryConfig.categories),
                    },
                ],
                captions: [{
                    culture: 'de',
                    caption: 'Rückfrage erstellen',
                },
                {
                    culture: 'en',
                    caption: 'Create inquiry',
                }],
                context: 'DmsObjectDetailsContextAction',
                uriTemplate: `${basePath}/create?id={dmsobject.property_document_id}`,
                iconUri: `${basePath}/public/icon-inquiry.png`,
            },
            {
                id: 'inquiryoverview',
                activationConditions: [
                    {
                        propertyId: 'repository.id',
                        operator: 'or',
                        values: [config.repositoryId],
                    },
                    {
                        propertyId: 'dmsobject.property_category',
                        operator: 'or',
                        values: getCategories(overviewConfig.categories),
                    },
                ],
                captions: [{
                    culture: 'de',
                    caption: 'Rückfrageübersicht',
                },
                {
                    culture: 'en',
                    caption: 'Inquiry overview',
                }],
                context: 'DmsObjectDetailsContextAction',
                uriTemplate: `${basePath}/overview?id={dmsobject.property_document_id}&category={dmsobject.property_category}`,
                iconUri: `${basePath}/public/icon-overview.png`,
            },
        ],
    };
};

/**
 * Gets the aws permission config for the overview or general inquiry
 * @param {String} type Type of permission (inquiry or overview)
 * @param {Object} req HTTP Request Object
 * @param {String} appName Name of the app
 * @returns {Object} Configuration for the given type
 */
async function getRemoteConfig(type, tenantID, appName) {
    const awsResult = await remoteConfigLoader.load(`${tenantID}-${type}`, appName);
    return JSON.parse(awsResult.Body.toString('utf-8'));
}

/**
 * Converts the category Array to an Array with ids
 * @param {Array<Object<>>} categories List of all d.3 categories
 * @return {Array<string>} List of all category ids
 */
function getCategories(categories) {
    const cat = [];
    categories.forEach((category) => {
        cat.push(category.key);
    });
    return cat;
}
