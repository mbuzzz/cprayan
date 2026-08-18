import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p", "br", "strong", "em", "u", "s", "blockquote",
  "ul", "ol", "li", "h2", "h3", "h4", "a", "code", "pre"
];

export function sanitizeRichText(value: unknown): string {
  if (typeof value !== "string") return "";
  return sanitizeHtml(value, {
    allowedTags,
    allowedAttributes: {
      a: ["href", "title", "target", "rel"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          rel: "noopener noreferrer nofollow",
          ...(attribs.target === "_blank" ? { target: "_blank" } : {})
        }
      })
    }
  });
}
