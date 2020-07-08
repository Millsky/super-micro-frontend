const express = require('express');
const path = require('path');
const app = express();
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const port = process.env.PORT || 8080;

const PROTO_PATH = path.resolve(__dirname, './orchestrator_service.proto');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const { orchestrator_service } = grpc.loadPackageDefinition(packageDefinition);

const orchestratorService = new orchestrator_service.Orchestrator(`kubernetes.docker.internal:31054`, grpc.credentials.createInsecure());

app.get('/health', (req, res) => res.send('OK'));

app.get('/', async (req, res) => {
    try {
        const services = {
            "footer": "",
            "header": "",
        };
        const markup = '{{header}}{{footer}}';
        const { linkTags, styleTags, dom, scriptTags } = await new Promise((resolve, reject) => {
            orchestratorService.GetFrontEnds({ "services": services, "markup": markup }, (err, response) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
        return res.send(`<!doctype html>
             <html>
                <head>
                    ${linkTags}
                    ${styleTags}
                </head>
               
                <body>
                  <div id="root">${dom}</div>
                  ${scriptTags}
                </body>
              </html>`);
    } catch (e) {
        console.log(e);
        res.send('BAD REQUEST');
    }
});

app.listen(`${port}`, '127.0.0.1', () => console.log(`Application is up and running on ${port}`));
