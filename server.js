/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const express = require('express');

const server = express();

const { createBundleRenderer } = require('vue-server-renderer');
const template = require('fs').readFileSync('./src/index.template.html', 'utf-8');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const configLoader = require('./global.config');

const appName = 'able-inquiryprocess';
const basePath = `/${appName}`;
const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
});

server.use(`${basePath}/dist`, express.static('./dist'));
server.use(`${basePath}/public`, express.static('./public'));

server.get(`${basePath}/*`, async (req, res) => {
    try {
        const tenantID = req.tenantId || '14q';
        const context = { url: req.url };
        const path = context.url.replace(basePath, '');
        const config = configLoader.load(tenantID);
        if (config.protectedRoutes.includes(path)) {
            let jsonResponse;
            if (path === '/') {
                jsonResponse = require('./modules/linkRelations/root')(basePath);
            } else {
                jsonResponse = await require(`./modules/linkRelations${path}`)(appName, basePath, tenantID);
            }
            res.send(jsonResponse);
        } else {
            const html = await renderer.renderToString(context);
            res.send(html);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

server.listen(8080, () => {
    console.log('Server started on port 8080');
});

module.exports = server;
