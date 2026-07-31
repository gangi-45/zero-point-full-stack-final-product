import { defineType, defineField } from "sanity";

export default defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "string",
      description: "Default title shown in the browser tab and search results.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Shown under the title in search results.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      description: "Preview image shared on social media (1200×630 recommended).",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
      ],
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [
        defineField({
          name: "keyword",
          title: "Keyword",
          type: "string",
          validation: (rule) => rule.max(60),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "pageTitle", subtitle: "metaDescription" },
  },
});
