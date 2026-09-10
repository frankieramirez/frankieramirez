import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

/**
 * Blog posts, newest first. Drafts are excluded from every build; pass
 * `includeDrafts: true` on surfaces that should preview them during `astro dev`.
 */
export async function getPublishedPosts({ includeDrafts = false, limit }: {
  includeDrafts?: boolean;
  limit?: number;
} = {}): Promise<BlogPost[]> {
  const previewDrafts = includeDrafts && import.meta.env.DEV;
  const posts = await getCollection("blog", ({ data }) => previewDrafts || !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return limit === undefined ? sorted : sorted.slice(0, limit);
}

/**
 * Post dates in UTC, so a post never shifts a day for readers west of the
 * meridian. `short` is the compact hero listing, `long` the blog and article.
 */
export function formatPostDate(date: Date, style: "short" | "long" = "long") {
  return date.toLocaleDateString("en-US", {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Reading time at 220 words a minute, never less than a minute. */
export function readingMinutes(body: string | undefined) {
  return Math.max(1, Math.ceil((body ?? "").split(/\s+/).length / 220));
}
