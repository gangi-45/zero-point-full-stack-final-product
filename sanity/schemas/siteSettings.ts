import { defineType, defineField } from "sanity";

const SOCIAL_PLATFORMS = [
  { title: "Facebook", value: "Facebook" },
  { title: "Instagram", value: "Instagram" },
  { title: "YouTube", value: "YouTube" },
  { title: "TikTok", value: "TikTok" },
  { title: "X (Twitter)", value: "X" },
  { title: "LinkedIn", value: "LinkedIn" },
];

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Shown in the navbar and footer. Leave empty to use the initials badge.",
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
      name: "logoInitials",
      title: "Logo initials (fallback)",
      type: "string",
      description: 'Shown when no logo image is set — e.g. "ZP".',
      initialValue: "ZP",
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Small browser tab icon.",
      options: { hotspot: true },
    }),
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      description: "Full brand name, used in the footer and copyright line.",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Shown under the business name in the navbar.",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "domain",
      title: "Domain",
      type: "string",
      description: 'e.g. "zeropointbyx.com" — used for canonical URLs.',
    }),
    defineField({
      name: "description",
      title: "Business description",
      type: "text",
      rows: 3,
      description: "Used in the footer about section.",
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: 'e.g. "+8801781685200"',
      validation: (rule) => rule.max(20),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      description: 'International format without "+" — e.g. "8801781685200".',
      validation: (rule) => rule.max(20),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "addressShort",
      title: "Short address",
      type: "string",
      description: "Compact address used on product pages.",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "businessHours",
      title: "Business hours",
      type: "string",
      description: 'e.g. "প্রতিদিন সকাল ১০টা থেকে রাত ৯টা"',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "mapsUrl",
      title: "Google Maps URL",
      type: "url",
      description: "Opened by the Get Directions button.",
    }),
    defineField({
      name: "mapsEmbed",
      title: "Google Maps embed URL",
      type: "url",
      description: "Embed URL used for the map iframe in the footer.",
    }),
    defineField({
      name: "findUsTitle",
      title: "Find us heading",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "findUsText",
      title: "Find us description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "getDirectionsLabel",
      title: "Get Directions button label",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          title: "Social link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Platform",
              type: "string",
              options: { list: SOCIAL_PLATFORMS, layout: "radio" },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        }),
      ],
    }),
    defineField({
      name: "copyrightSuffix",
      title: "Copyright suffix",
      type: "string",
      description: 'Text after the copyright line — e.g. "Mymensingh, Bangladesh".',
      initialValue: "Mymensingh, Bangladesh",
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    select: {
      title: "businessName",
      subtitle: "brandName",
      media: "logo",
    },
  },
});
