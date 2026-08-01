import { Container } from "@/components/shared/Container";
import type { HomepageContent } from "@/types/content";

type VideoSectionProps = {
  content: HomepageContent["videoSection"];
};

export function VideoSection({ content }: VideoSectionProps) {
  return (
    <section id="videos" className="scroll-mt-24 py-16">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-muted sm:text-base">
            {content.subtitle}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.videos.map((video) => (
            <figure key={video.youtubeId} className="glass-card overflow-hidden">
              <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm font-semibold text-ink">
                {video.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
