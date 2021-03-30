global.fetch = require('node-fetch');
const express = require('express');
const config = require('universal-config');
const toJson = require('unsplash-js').toJson;
const createApi = require('unsplash-js').createApi;

const unsplash = createApi({
  accessKey: 'sNfrXWKF_cbmzUWAcUQ-TcPgVt7g1pjJm-I10OnhnxY',
  secretKey: 'BYm6qcmzmLrZigQD_o8JHL354uLUnqwdAhJqKg-YEGA',
});

const app = express();
app.get('/api/photos', (req, res) => {
  // unsplash.photos
  //   .listPhotos(1, 30)
  //   .then(toJson)
  //   .then((json) => res.json(json));
  unsplash.photos
    .list(1, 30)
    .then(toJson)
    .then((json) => res.json(json));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
