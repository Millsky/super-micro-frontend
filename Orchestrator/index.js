const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8080;

app.get('/health', (req, res) => res.json({ health: 'OK' }));

app.get('/', async (req, res) => {
  try {
    const [component1, component2, component3] = await Promise.all([
      axios.get('http://fragment-1:8080/frontend-fragment'),
      axios.get('http://fragment-2:8080/frontend-fragment'),
      axios.get('http://fragment-3:8080/frontend-fragment'),
    ]);
    res.send(`${component1.data.data.dom}${component2.data.data.dom}${component3.data.data.dom}`);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => console.log(`Application is up and running on ${port}`));
