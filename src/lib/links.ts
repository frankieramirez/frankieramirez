export const isExternal = (href: string) => /^https?:\/\//i.test(href);

export const externalAttrs = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener" } : {};
