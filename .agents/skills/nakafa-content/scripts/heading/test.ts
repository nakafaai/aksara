import type { CorpusPage } from "#nakafa-content/heading/identity";
import { outlineHeadings } from "#nakafa-content/heading/outline";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/**
 * Builds one corpus page from its title and its headings, each heading
 * followed by a paragraph, as the outline rules read it.
 */
export function corpusPage(
  file: string,
  title: string,
  headings: readonly string[],
  options: {
    readonly kind?: "article" | "lesson";
    readonly locale?: LessonVoiceLocale;
  } = {}
): CorpusPage {
  const kind = options.kind ?? "lesson";
  const sections = headings.map(
    (heading) => `${heading}\n\nOne paragraph teaches this part.`
  );
  const source = (
    kind === "lesson" ? [...sections, `> ${title} holds.`] : sections
  ).join("\n\n");
  const tree = parseLessonMdx(source);
  return {
    file,
    page: {
      headings: outlineHeadings(source, tree),
      kind: options.kind ?? "lesson",
      locale: options.locale ?? "id",
      title,
      tree,
    },
    source,
  };
}
