import "server-only";
import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/lib/env";

export { apiVersion, dataset, isSanityConfigured, projectId };

let serverClient: SanityClient | null = null;

if (isSanityConfigured()) {
  serverClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
}

export function getServerClient(): SanityClient | null {
  return serverClient;
}

let imageBuilder: ReturnType<typeof imageUrlBuilder> | null = null;

if (projectId) {
  imageBuilder = imageUrlBuilder(createClient({ projectId, dataset, apiVersion }));
}

export function urlFor(source: SanityImageSource | undefined | null): string {
  if (!source || !imageBuilder) return "";
  try {
    return imageBuilder.image(source).auto("format").fit("max").url();
  } catch (error) {
    console.error("[sanity] Failed to build image URL:", error);
    return "";
  }
}
