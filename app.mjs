/* eslint-disable no-console */
import http from 'http';
import fs from 'fs';
import path from 'path';

const aliases = {
  '/': '/index.html',
};
const contentTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
};
const fallbackExtension = '.js';
const fallbackContentType = 'text/plain';

const server = http.createServer((request, response) => {
  const { url } = request;

  console.log(`Requested url: ${url}`);

  let fileName = aliases[url] || url;
  let extension = path.extname(fileName);

  fileName = path.join('static', fileName);

  if (!extension && fs.existsSync(fileName + fallbackExtension)) {
    extension = fallbackExtension;
    fileName += fallbackExtension;
  }

  if (fs.existsSync(fileName)) {
    const contentType = contentTypes[extension] || fallbackContentType;

    console.log(`File name ${fileName}`);
    console.log(`Extension: ${extension}`);
    console.log(`Content type: ${contentType}`);
    response.setHeader('Content-Type', contentType);
    response.end(fs.readFileSync(fileName));
  } else {
    console.error('Not found');
    response.statusCode = 404;
    response.setHeader('Content-Type', fallbackContentType);
    response.end('404 Not Found');
  }
});

server.listen(80);

console.log('Server started on port 80...');
