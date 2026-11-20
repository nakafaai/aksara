import { Array as Arr, HashMap, HashSet, Option, Order } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { CorpusPage } from "#nakafa-content/heading/identity";
import { scaffoldTail } from "#nakafa-content/heading/role";

/** How many other pages a message names before it counts the rest. */
const NAMED_PAGES = 3;

/** The signature of one page's scaffold tail, such as `mistakes > practice`. */
function tailSignature(page: CorpusPage): string {
  return Arr.join(
    Arr.map(
      scaffoldTail(page.page.locale, page.page.headings),
      ({ role }) => role
    ),
    " > "
  );
}

/**
 * The cross-lesson skeleton check: a changed lesson page that ends with the
 * same scaffold sections as another lesson page of its locale carries the
 * template's fixed tail, such as common mistakes then practice with solutions.
 * Renaming those headings keeps the tail, so this check reads the roles the
 * headings announce, never their exact words.
 */
export function findSkeletonFindings(
  pages: readonly CorpusPage[],
  report: HashSet.HashSet<string>
): readonly (readonly [string, HeadingFinding])[] {
  const lessons = Arr.filter(pages, ({ page }) => page.kind === "lesson");
  const byTail = Arr.reduce(
    lessons,
    HashMap.empty<string, readonly string[]>(),
    (index, page) => {
      const signature = tailSignature(page);
      if (signature === "") {
        return index;
      }
      const key = `${page.page.locale}\u0000${signature}`;
      const known = Option.getOrElse(HashMap.get(index, key), () => []);
      return HashMap.set(index, key, Arr.append(known, page.file));
    }
  );
  const reported = Arr.filter(lessons, (page) =>
    HashSet.has(report, page.file)
  );
  return Arr.flatMap(
    reported,
    (page): readonly (readonly [string, HeadingFinding])[] => {
      const tail = scaffoldTail(page.page.locale, page.page.headings);
      const signature = tailSignature(page);
      const others = Arr.filter(
        Option.getOrElse(
          HashMap.get(byTail, `${page.page.locale}\u0000${signature}`),
          () => []
        ),
        (file) => file !== page.file
      );
      const [first] = tail;
      if (first === undefined || others.length === 0) {
        return [];
      }
      const named = Arr.join(
        Arr.sort(others, Order.String).slice(0, NAMED_PAGES),
        ", "
      );
      const rest = others.length - NAMED_PAGES;
      return [
        [
          page.file,
          {
            blocking: true,
            line: first.heading.line,
            message: `The page ends with the scaffold sections ${signature}, as ${others.length} other page(s) of its locale do (${named}${rest > 0 ? `, and ${rest} more` : ""}). Mistakes, examples, and practice appear only where they teach something specific to this topic, inside the section they belong to, never as a fixed tail. Restructure the page; renaming the headings keeps the tail.`,
            rule: "shared-skeleton",
          },
        ] as const,
      ];
    }
  );
}
