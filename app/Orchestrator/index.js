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
     includeDirs: ["google/protobuf/any.proto", "google/protobuf/struct.proto"]
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
        ctx.res = { dom };
    } catch (e) {
        console.log(e);
    }
}

app.use({ getFrontEnds });

app.start(`127.0.0.1:${port}`);
