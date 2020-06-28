const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8080;

const services = process.env.FRONTEND_SERVICES.split(',');
const service_endpoints = services.map(s => `http://${s}:8080/frontend-fragment`);

app.get('/health', (req, res) => res.json({ health: 'OK' }));

app.get('/', async (req, res) => {
  try {
    const components = await Promise.all(service_endpoints.map(e => axios.get(e)));
    res.send(components.reduce((acc, resp, i) => {
      const { dom } = resp.data.data;
      return acc.replace(`{{${services[i]}}}`, dom);
    }, process.env.FRONTEND_MARKUP));
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => console.log(`Application is up and running on ${port}`));
