const path = require('path');
const grpc = require('grpc');
const Mali = require('mali');
const protoLoader = require('@grpc/proto-loader');
const port = process.env.PORT || 8080;

const PROTO_PATH_FRONTEND_SERVICE = path.resolve(__dirname, './frontend_service.proto');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH_FRONTEND_SERVICE,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: false,
     objects: true,
     oneofs: true,
    });

const { frontend_service } = grpc.loadPackageDefinition(packageDefinition);

const PROTO_PATH_ORCHESTRATOR_SERVICE = path.resolve(__dirname, './orchestrator_service.proto');

const app = new Mali(PROTO_PATH_ORCHESTRATOR_SERVICE, 'Orchestrator');

async function getFrontEnds (ctx) {
    const services = Object.keys(ctx.req.services);
    const { markup } = ctx.req;
    const service_clients = services.map(
        s => new frontend_service.FrontEnd(`${s}:8080`, grpc.credentials.createInsecure()),
    );
    try {
        const components = await Promise.all(service_clients.map((client, index) => new Promise((resolve, reject) => {
            const serviceName = services[index];
            const serviceArgs = ctx.req.services[serviceName];
            client.GetFrontEnd({
                props: serviceArgs,
            }, (err, response) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        })));
        const dom = components.reduce((acc, resp, i) => {
            const { dom } = resp;
            return acc.replace(new RegExp(`{{${services[i]}}}`, 'g'), dom);
        }, markup);

        const scripts = components.reduce((acc, resp, i) => {
            const { scriptTags, linkTags, styleTags } = resp;
            return {
                scriptTags: `${acc.scriptTags}${scriptTags}`,
                linkTags: `${acc.linkTags}${linkTags}`,
                styleTags: `${acc.styleTags}${styleTags}`,
            }
        }, {
            scriptTags: '',
            linkTags: '',
            styleTags: '',
        });

        const { scriptTags, linkTags, styleTags } = scripts;

        ctx.res = { dom, scriptTags, linkTags, styleTags };
    } catch (e) {
        console.log(e);
    }
}

app.use({ getFrontEnds });

app.start(`127.0.0.1:${port}`);
