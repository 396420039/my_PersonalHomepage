import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

const defaultFenceRenderer = markdown.renderer.rules.fence;

markdown.renderer.rules.fence = (tokens, index, options, env, self) => {
  const token = tokens[index];

  if (token.info.trim() === 'mermaid') {
    const diagram = markdown.utils.escapeHtml(token.content);
    return `<figure class="article-diagram">
      <div class="diagram-label">SYSTEM DIAGRAM</div>
      <div class="mermaid">${diagram}</div>
    </figure>`;
  }

  return defaultFenceRenderer(tokens, index, options, env, self);
};

const postModules = import.meta.glob('./content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    throw new Error('Markdown post is missing frontmatter.');
  }

  const fields = new Map();
  for (const line of match[1].split('\n')) {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    fields.set(key, value);
  }

  return {
    meta: {
      title: readString(fields, 'title'),
      date: readString(fields, 'date'),
      summary: readString(fields, 'summary'),
      tags: readArray(fields.get('tags')),
      featured: fields.get('featured') === 'true',
    },
    body: match[2].trim(),
  };
}

function readString(fields, key) {
  const value = fields.get(key);
  if (!value) {
    throw new Error(`Markdown post is missing "${String(key)}" frontmatter.`);
  }

  return value.replace(/^["']|["']$/g, '');
}

function readArray(value = '') {
  const trimmed = value.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return [];
  }

  return trimmed
    .slice(1, -1)
    .split(',')
    .map((item) => item.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
}

function slugFromPath(path) {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? path;
}

function readingMinutes(body) {
  const englishWords = body.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  const cjkCharacters = body.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  return Math.max(1, Math.ceil((englishWords + cjkCharacters / 2) / 220));
}

export const posts = Object.entries(postModules)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(String(raw));

    return {
      slug: slugFromPath(path),
      ...meta,
      body,
      html: markdown.render(body),
      readingMinutes: readingMinutes(body),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const featuredPosts = posts.filter((post) => post.featured);

export const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) =>
  a.localeCompare(b, 'zh-CN'),
);

export function findPost(slug) {
  return posts.find((post) => post.slug === slug);
}
