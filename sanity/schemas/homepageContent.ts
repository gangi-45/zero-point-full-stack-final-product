import { defineType, defineField } from "sanity";

const TRUST_ICONS = [
  { title: "Shield", value: "shield" },
  { title: "Check circle", value: "check" },
  { title: "Badge check", value: "badge" },
  { title: "Star", value: "star" },
  { title: "Truck", value: "truck" },
];

export default defineType({
  name: "homepageContent",
  title: "Homepage Content",
  type: "document",
  fields: [
    defineField({
      name: "customerStats",
      title: "Customer statistics",
      type: "array",
      description: "Trust numbers shown in the hero, e.g. ৫০০+ সন্তুষ্ট কাস্টমার.",
      of: [
        defineField({
          name: "customerStat",
          title: "Statistic",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: 'e.g. "৫০০+"',
              validation: (rule) => rule.required().max(20),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g. "সন্তুষ্ট কাস্টমার"',
              validation: (rule) => rule.required().max(60),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "trustBadges",
      title: "Trust badges",
      type: "array",
      description: "Reassurance messages shown in the hero.",
      of: [
        defineField({
          name: "trustBadge",
          title: "Trust badge",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: TRUST_ICONS, layout: "radio" },
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featuredProductsSection",
      title: "Featured products section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          validation: (rule) => rule.max(300),
        }),
      ],
    }),
    defineField({
      name: "categoryShowcase",
      title: "Category showcase section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          validation: (rule) => rule.max(300),
        }),
        defineField({
          name: "categories",
          title: "Categories",
          type: "array",
          of: [
            defineField({
              name: "categoryCard",
              title: "Category",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required().max(60),
                }),
                defineField({
                  name: "emoji",
                  title: "Emoji",
                  type: "string",
                  description: 'e.g. "📱"',
                  validation: (rule) => rule.max(8),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "string",
                  validation: (rule) => rule.max(300),
                }),
                defineField({
                  name: "href",
                  title: "Link",
                  type: "string",
                  initialValue: "/products",
                  validation: (rule) => rule.max(120),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "exchangeSection",
      title: "Exchange section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          validation: (rule) => rule.max(300),
        }),
        defineField({
          name: "points",
          title: "Points",
          type: "array",
          of: [
            defineField({
              name: "point",
              title: "Point",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required().max(60),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "string",
                  validation: (rule) => rule.max(200),
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "bonusAmount",
          title: "Bonus amount",
          type: "string",
          description: 'e.g. "৳3,000"',
          validation: (rule) => rule.max(40),
        }),
        defineField({
          name: "bonusCaption",
          title: "Bonus caption",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "bonusSubtitle",
          title: "Bonus subtitle",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
      ],
    }),
    defineField({
      name: "videoSection",
      title: "Video section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          validation: (rule) => rule.max(300),
        }),
        defineField({
          name: "videos",
          title: "Videos",
          type: "array",
          of: [
            defineField({
              name: "video",
              title: "Video",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required().max(120),
                }),
                defineField({
                  name: "youtubeId",
                  title: "YouTube video ID",
                  type: "string",
                  description: "The ID after watch?v= in the YouTube URL.",
                  validation: (rule) => rule.required().max(30),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineField({
          name: "testimonial",
          title: "Testimonial",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(1000),
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (rule) => rule.min(1).max(5),
              initialValue: 5,
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "featuredProductsSection.title",
      subtitle: "categoryShowcase.title",
    },
  },
});
