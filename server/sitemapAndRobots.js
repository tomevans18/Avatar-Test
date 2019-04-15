const sm = require('sitemap');
const path = require('path');

const port = parseInt(process.env.PORT) || 3010;

const sitemap = sm.createSitemap({
  hostname: `localhost:${port}`,
  cacheTime: 600000, // 600 sec - cache purge period
});

const setup = ({ server }) => {
  sitemap.add({
    url: '/',
    changefreq: 'daily',
    priority: 1,
  });

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });

  server.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../static', 'robots.txt'));
  });
};

module.exports = setup;
