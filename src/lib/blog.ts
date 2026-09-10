import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

/**
 * Blog posts, newest first. Drafts are excluded from every build; pass
 * `includeDrafts: true` on surfaces that should preview them during `astro dev`.
 */
export async function getPublishedPosts({ includeDrafts = false } = {}): Promise<BlogPost[]> {
  const previewDrafts = includeDrafts && import.meta.env.DEV;
  const posts = await getCollection("blog", ({ data }) => previewDrafts || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
