const express = require('express');
const next = require('next');
const helmet = require('helmet');
const { config } = require('dotenv');
const sitemapAndRobots = require('./sitemapAndRobots');

config();

const port = parseInt(process.env.PORT) || 3010;
const dev = process.env.NODE_ENV !== 'production';

const app = next({
  dev,
});
const handle = app.getRequestHandler();

// Nextjs's server prepared
app.prepare().then(() => {
  const server = express();

  sitemapAndRobots({
    server,
  });

  server.use(helmet());

  server.get('*', (req, res) => handle(req, res));

  // starting express server
  server.listen(port, err => {
    if (err) throw err;
    console.log(`--- Ready on localhost:${port}`); // eslint-disable-line no-console
  });
});

module.export = app;
