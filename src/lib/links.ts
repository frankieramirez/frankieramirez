/** A link that leaves the site, and so opens in a new tab. */
export const isExternal = (href: string) => /^https?:\/\//i.test(href);

/**
 * The attributes an off-site link needs. Spread onto the anchor so the three
 * link lists (ledger, contact, footer) stop each deciding it for themselves.
 */
export const externalAttrs = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener" } : {};
