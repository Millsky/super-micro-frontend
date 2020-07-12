const React = require("react");
const { renderToString } = require("react-dom/server");
const app = require('express')();
const reactApp = require('./dist/server/component');

const port = process.env.PORT || 8080;

function createEdgeChunks(app) {
        app.use(`/edge-handler.js`, (req, res) => {
            const props = (req.query.props && JSON.parse(req.query.props)) || {};
            const html = renderToString(React.createElement(reactApp, props));
            res.setHeader("Content-Type", "text/javascript");
            res.status(200).send(`
                const React = require("react");
                const children = require("html-react-parser")(${JSON.stringify(html)});
                module.exports = () => {
                    return React.createElement(React.Fragment, {}, children);
                };
            `);
        });
}

createEdgeChunks(app);

app.listen(port, '127.0.0.1', () => console.log(`Application is up and running on ${port}`));
