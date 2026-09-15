import { readFile } from 'node:fs/promises';

const pages = {
  normal: 'dist/index.html',
  lesson: 'dist/learn/social-entertainment-landscape/index.html',
  notFound: 'dist/404.html',
};

const html = {};
for (const [name, path] of Object.entries(pages)) html[name] = await readFile(path, 'utf8');

const count = (source, pattern) => source.match(pattern)?.length ?? 0;
const requireOnce = (source, pattern, label) => {
  if (count(source, pattern) !== 1) throw new Error(`${label} must occur exactly once`);
};

for (const name of ['normal', 'lesson']) {
  requireOnce(html[name], /<link rel="canonical" href="[^"]+">/g, `${name} canonical`);
  requireOnce(html[name], /<meta property="og:url" content="[^"]+">/g, `${name} og:url`);
}

requireOnce(html.notFound, /<meta name="robots" content="noindex,follow">/g, '404 robots noindex');
if (count(html.notFound, /<link rel="canonical" href="[^"]+">/g) !== 0) throw new Error('404 must omit canonical');
if (count(html.notFound, /<meta property="og:url" content="[^"]+">/g) !== 0) throw new Error('404 must omit og:url');

console.log('metadata contract passed');
