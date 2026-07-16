import { cp, mkdir, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');
const client = resolve(dist, 'client');
const server = resolve(dist, 'server');

await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (entry.name === 'client' || entry.name === 'server' || entry.name === '.openai') continue;
  await cp(resolve(dist, entry.name), resolve(client, entry.name), { recursive: true });
}

await cp(resolve(root, 'worker', 'index.js'), resolve(server, 'index.js'));
