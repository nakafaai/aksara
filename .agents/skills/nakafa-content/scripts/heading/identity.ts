import { Array as Arr, HashMap, HashSet, Option, Order, pipe } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { OutlinePage } from "#nakafa-content/heading/page";
import { foldLabel } from "#nakafa-content/heading/title";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** One page of the corpus, by its repository path, with its source. */
export interface CorpusPage {
  readonly file: string;
  readonly page: OutlinePage;
  readonly source: string;
}

/** Where one folded label stands: the file and the line. */
interface Place {
  readonly file: string;
  readonly line: number;
}

/**
 * The standard scientific section names of an article, folded, per locale.
 * Decision D13 of 20 November 2026 exempts exactly these from
 * `heading-unique` in articles; every other article heading stays unique.
 */
const ARTICLE_SECTION_NAMES: Record<
  LessonVoiceLocale,
  HashSet.HashSet<string>
> = {
  de: HashSet.make("abstract", "einleitung", "problemstellung"),
  en: HashSet.make("abstract", "introduction", "problem statement"),
  id: HashSet.make("abstrak", "pendahuluan", "pernyataan masalah"),
  ms: HashSet.make(
    "abstrak",
    "pendahuluan",
    "pengenalan",
    "pernyataan masalah"
  ),
};

/** Tells whether one heading is an article's exempt scientific section name. */
function isArticleSectionName(page: OutlinePage, label: string): boolean {
  return (
    page.kind === "article" &&
    HashSet.has(ARTICLE_SECTION_NAMES[page.locale], label)
  );
}

/** How many other places a message names before it counts the rest. */
const NAMED_PLACES = 3;

/** Indexes places by locale and folded label. */
function indexBy(
  pages: readonly CorpusPage[],
  entries: (page: CorpusPage) => readonly (readonly [string, number])[]
): HashMap.HashMap<string, readonly Place[]> {
  return Arr.reduce(
    pages,
    HashMap.empty<string, readonly Place[]>(),
    (index, page) =>
      Arr.reduce(entries(page), index, (inner, [label, line]) => {
        const key = `${page.page.locale}\u0000${label}`;
        const known = Option.getOrElse(HashMap.get(inner, key), () => []);
        return HashMap.set(
          inner,
          key,
          Arr.append(known, { file: page.file, line })
        );
      })
  );
}

/** Names the other places of a label, the first few by path, then a count. */
function describe(places: readonly Place[]): string {
  const files = pipe(
    places,
    Arr.map(({ file, line }) => `${file}:${line}`),
    Arr.sort(Order.String)
  );
  const named = Arr.join(files.slice(0, NAMED_PLACES), ", ");
  const rest = files.length - NAMED_PLACES;
  return rest > 0 ? `${named}, and ${rest} more` : named;
}

/** The places of one label except the given one. */
function othersOf(
  index: HashMap.HashMap<string, readonly Place[]>,
  locale: string,
  label: string,
  self: Place
): readonly Place[] {
  return Arr.filter(
    Option.getOrElse(HashMap.get(index, `${locale}\u0000${label}`), () => []),
    ({ file, line }) => file !== self.file || line !== self.line
  );
}

/**
 * R7 to R9 for every page in `report`, compared with every page of the corpus
 * in the same locale: page titles are unique, every heading is unique, and no
 * heading repeats another page's title.
 */
export function findIdentityFindings(
  pages: readonly CorpusPage[],
  report: HashSet.HashSet<string>
): readonly (readonly [string, HeadingFinding])[] {
  const titles = indexBy(pages, ({ page }) => [[foldLabel(page.title), 1]]);
  const headings = indexBy(pages, ({ page }) =>
    Arr.filter(
      Arr.map(
        page.headings,
        ({ line, words }) => [foldLabel(words), line] as const
      ),
      ([label]) => !isArticleSectionName(page, label)
    )
  );
  const reported = Arr.filter(pages, (page) => HashSet.has(report, page.file));
  return Arr.flatMap(
    reported,
    ({ file, page }): readonly (readonly [string, HeadingFinding])[] => {
      const title = foldLabel(page.title);
      const sharedTitle = othersOf(titles, page.locale, title, {
        file,
        line: 1,
      });
      const titleFindings: HeadingFinding[] =
        title === "" || sharedTitle.length === 0
          ? []
          : [
              {
                blocking: true,
                line: 1,
                message: `The title '${page.title}' (${page.locale}) is also the title of ${describe(sharedTitle)}. Every page has its own title: it is the page's identity in search.`,
                rule: "title-unique",
              },
            ];
      const headingFindings = Arr.flatMap(
        page.headings,
        ({ line, words }): HeadingFinding[] => {
          const label = foldLabel(words);
          if (label === "") {
            return [];
          }
          const named = Arr.filter(
            othersOf(titles, page.locale, label, { file, line: 0 }),
            (other) => other.file !== file
          );
          if (named.length > 0) {
            return [
              {
                blocking: true,
                line,
                message: `'${words}' is the title of ${describe(named)}. That question has its own page: teach how this topic relates to it and link to it.`,
                rule: "heading-names-lesson",
              },
            ];
          }
          if (isArticleSectionName(page, label)) {
            return [];
          }
          const repeated = othersOf(headings, page.locale, label, {
            file,
            line,
          });
          return repeated.length === 0
            ? []
            : [
                {
                  blocking: true,
                  line,
                  message: `'${words}' (${page.locale}) also heads a section at ${describe(repeated)}. Every heading is unique in its locale. Name what this page does with the idea; if both pages carry the same section, restructure this one instead of renaming it.`,
                  rule: "heading-unique",
                },
              ];
        }
      );
      return Arr.map(
        [...titleFindings, ...headingFindings],
        (finding) => [file, finding] as const
      );
    }
  );
}
