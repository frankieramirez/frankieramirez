import type { APIRoute } from 'astro';
import { getPublishedPosts } from '@/lib/blog';

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[character]!);

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://frankieramirez.com');
  const posts = await getPublishedPosts();
  const items = posts.map((post) => {
    const url = escapeXml(new URL(`/blog/${post.id}/`, base).href);
    return `<item>
      <title>${escapeXml(post.data.title)}</title>
      <description>${escapeXml(post.data.description)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
    </item>`;
  }).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Frankie Ramirez’s blog</title>
        <link>${escapeXml(new URL('/blog/', base).href)}</link>
        <description>Building interfaces and the decisions behind them, along with experiments in AI-assisted development and self-hosting.</description>
        <language>en-us</language>
        <atom:link href="${escapeXml(new URL('/rss.xml', base).href)}" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
