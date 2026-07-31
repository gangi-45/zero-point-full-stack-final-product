import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroContent",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Badge text",
      type: "string",
      description: "Small pill shown above the headline.",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "array",
      description:
        "The main headline, split into segments. Mark a segment as accent to highlight it in brand color.",
      of: [
        defineField({
          name: "headlineSegment",
          title: "Segment",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "isAccent",
              title: "Highlight in brand color",
              type: "boolean",
              initialValue: false,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      description: "Shown inside the featured product card on the right.",
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
      name: "primaryCtaLabel",
      title: "Primary button label",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary button link",
      type: "string",
      description: 'e.g. "/products"',
      initialValue: "/products",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary button label",
      type: "string",
      description: "Opens the exchange quote form.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "featuredProductTitle",
      title: "Featured product — title",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "featuredProductSubtitle",
      title: "Featured product — subtitle",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "featuredProductPrice",
      title: "Featured product — price",
      type: "string",
      description: 'e.g. "৳82,000"',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "ticker",
      title: "Offer ticker",
      type: "array",
      description: "Scrolling promo messages under the hero.",
      of: [
        defineField({
          name: "tickerItem",
          title: "Ticker message",
          type: "string",
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "badge",
      media: "heroImage",
    },
  },
});
