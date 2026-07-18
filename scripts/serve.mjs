import { createReadStream, realpath, realpathSync, stat } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = '127.0.0.1';
const PORT = 4173;
const root = realpathSync(resolve(fileURLToPath(new URL('..', import.meta.url))));

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
]);

function reply(response, statusCode, message) {
  response.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(message);
}

const server = createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    reply(response, 405, 'Method not allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent((request.url || '/').split('?')[0]);
  } catch {
    reply(response, 400, 'Bad request');
    return;
  }

  const pathSegments = pathname.split(/[\\/]/);
  if (pathname.includes('\0') || pathSegments.includes('..')) {
    reply(response, 403, 'Forbidden');
    return;
  }

  const relativePath = pathname === '/'
    ? 'index.html'
    : pathname.replace(/^\/+/, '');
  const filePath = resolve(root, relativePath);
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    reply(response, 403, 'Forbidden');
    return;
  }

  realpath(filePath, (pathError, realPath) => {
    if (pathError) {
      reply(response, 404, 'Not found');
      return;
    }

    if (realPath !== root && !realPath.startsWith(`${root}${sep}`)) {
      reply(response, 403, 'Forbidden');
      return;
    }

    stat(realPath, (error, file) => {
      if (error || !file.isFile()) {
        reply(response, 404, 'Not found');
        return;
      }

      response.writeHead(200, {
        'Content-Type': mimeTypes.get(extname(realPath).toLowerCase()) ||
          'application/octet-stream',
        'Content-Length': file.size,
        'X-Content-Type-Options': 'nosniff',
      });

      if (request.method === 'HEAD') {
        response.end();
        return;
      }

      const stream = createReadStream(realPath);
      stream.on('error', () => {
        if (!response.headersSent) reply(response, 500, 'Server error');
        else response.destroy();
      });
      stream.pipe(response);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Preview available at http://${HOST}:${PORT}/`);
});
