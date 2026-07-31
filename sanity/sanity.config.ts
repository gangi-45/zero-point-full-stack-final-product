import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { dataset, projectId } from "./lib/env";

const SINGLETONS = [
  { id: "siteSettings", title: "Site Settings", type: "siteSettings" },
  { id: "heroContent", title: "Hero Section", type: "heroContent" },
  { id: "homepageContent", title: "Homepage Content", type: "homepageContent" },
  { id: "seoSettings", title: "SEO Settings", type: "seoSettings" },
];

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .id(singleton.id)
          .child(
            S.document()
              .schemaType(singleton.type)
              .documentId(singleton.id),
          ),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.some((singleton) => singleton.type === listItem.getId()),
      ),
    ]);

export default defineConfig({
  name: "zeropoint-cms",
  title: "Zero Point CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
