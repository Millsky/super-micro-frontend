const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const port = process.env.PORT || 8080;




const PROTO_PATH = path.resolve(__dirname, './frontend_service.proto');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const { frontend_service } = grpc.loadPackageDefinition(packageDefinition);

const services = process.env.FRONTEND_SERVICES.split(',');

const service_clients = services.map(
  s => new frontend_service.FrontEnd(`${s}:8080`, grpc.credentials.createInsecure())
);

app.get('/health', (req, res) => res.json({ health: 'OK' }));

app.get('/', async (req, res) => {
  try {
    const components = await Promise.all(service_clients.map(client => new Promise((resolve, reject) => {
        client.GetFrontEnd({}, (err, response) => {
            resolve(response);
        });
    })));
    res.send(components.reduce((acc, resp, i) => {
      const { dom } = resp;
      return acc.replace(`{{${services[i]}}}`, dom);
    }, process.env.FRONTEND_MARKUP));
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => console.log(`Application is up and running on ${port}`));
