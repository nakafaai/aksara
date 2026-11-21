import { Array as Arr, Option } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { OutlineHeading } from "#nakafa-content/heading/outline";
import { sectionRole } from "#nakafa-content/heading/role";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/**
 * The outline budget of decision D2 (20 November 2026), measured on the
 * outline panel of nakafa.com: about ten entries show without scrolling on a
 * 1366 by 768 laptop and thirteen to fourteen on a 1440 by 900 one.
 */
export const MOST_ENTRIES = 12;
/** Above this many entries the outline still fits but asks for a review. */
export const TARGET_ENTRIES = 10;
/** The most H2 sections a page holds. */
export const MOST_SECTIONS = 8;
/** Below this many H2 sections a page asks for a review. */
export const FEWEST_SECTIONS = 4;
/** The most H3 subsections one H2 opens. */
export const MOST_SUBSECTIONS = 4;
/** From this many H2 sections a page groups related sections under subsections. */
export const FLAT_SECTIONS = 4;

const SECTION_DEPTH = 2;
const SUBSECTION_DEPTH = 3;

/** Builds one finding at a heading line. */
function findingAt(
  heading: OutlineHeading,
  rule: string,
  blocking: boolean,
  message: string
): HeadingFinding {
  return { blocking, line: heading.line, message, rule };
}

/** Lists each H2 with the H3 subsections it opens, in page order. */
export function sectionsOf(headings: readonly OutlineHeading[]) {
  return Arr.flatMap(headings, (heading, index) => {
    if (heading.depth !== SECTION_DEPTH) {
      return [];
    }
    const after = headings.slice(index + 1);
    const below = Option.match(
      Arr.findFirstIndex(after, ({ depth }) => depth <= SECTION_DEPTH),
      { onNone: () => after, onSome: (end) => after.slice(0, end) }
    );
    return [
      {
        heading,
        subsections: Arr.filter(
          below,
          ({ depth }) => depth === SUBSECTION_DEPTH
        ),
      },
    ];
  });
}

/** R1: the outline fits the panel, at most twelve H2 and H3 entries. */
function findEntryBudget(
  headings: readonly OutlineHeading[]
): HeadingFinding[] {
  const entries = Arr.filter(
    headings,
    ({ depth }) => depth === SECTION_DEPTH || depth === SUBSECTION_DEPTH
  );
  const [first] = entries;
  if (first === undefined || entries.length <= TARGET_ENTRIES) {
    return [];
  }
  const blocking = entries.length > MOST_ENTRIES;
  return [
    findingAt(
      first,
      "outline-budget",
      blocking,
      `The outline has ${entries.length} entries (H2 and H3); the outline panel shows about 10 without scrolling. ${blocking ? `Keep at most ${MOST_ENTRIES}` : "Aim for 6 to 10"}: merge subsections that share one teaching job, write a procedure as an ordered list, or split the page if it answers two main questions.`
    ),
  ];
}

/** R2: a page holds four to eight H2 sections. */
function findSectionCount(
  sections: readonly { readonly heading: OutlineHeading }[]
): HeadingFinding[] {
  const extra = sections[MOST_SECTIONS];
  if (extra !== undefined) {
    return [
      findingAt(
        extra.heading,
        "section-count",
        true,
        `The page has ${sections.length} H2 sections; keep 4 to 8. Group the sections that teach one idea under one H2 with subsections.`
      ),
    ];
  }
  const [first] = sections;
  return first !== undefined && sections.length < FEWEST_SECTIONS
    ? [
        findingAt(
          first.heading,
          "section-count",
          false,
          `The page has ${sections.length} H2 sections; most pages need 4 to 8. Give each main idea its own section.`
        ),
      ]
    : [];
}

/** R3: an H2 opens no subsection or two to four; a single subsection always blocks. */
function findFanout(
  sections: readonly {
    readonly heading: OutlineHeading;
    readonly subsections: readonly OutlineHeading[];
  }[]
): HeadingFinding[] {
  return Arr.flatMap(sections, ({ heading, subsections }) => {
    const [only] = subsections;
    if (subsections.length === 1 && only !== undefined) {
      return [
        findingAt(
          only,
          "lone-subsection",
          true,
          `'${heading.words}' opens only one subsection ('${only.words}'); keep 0 or 2 to 4 subsections, with no exemption for solution headings. Merge it into its section, split the section into two real subtopics, or weave exercises and solutions directly into the section they test.`
        ),
      ];
    }
    return subsections.length > MOST_SUBSECTIONS - 1
      ? [
          findingAt(
            heading,
            "section-fanout",
            subsections.length > MOST_SUBSECTIONS,
            `'${heading.words}' opens ${subsections.length} subsections; keep 2 to 4. Turn parallel cases into a table or an ordered list, or split the section by teaching job.`
          ),
        ]
      : [];
  });
}

/** R4: a page with four or more H2 groups related sections under one H2. */
function findFlatSections(
  locale: LessonVoiceLocale,
  sections: readonly {
    readonly heading: OutlineHeading;
    readonly subsections: readonly OutlineHeading[];
  }[]
): HeadingFinding[] {
  const [first] = sections;
  const grouped = Arr.some(sections, ({ subsections }) =>
    Arr.some(
      subsections,
      (subsection) => sectionRole(locale, subsection) !== "solutions"
    )
  );
  return first === undefined || sections.length < FLAT_SECTIONS || grouped
    ? []
    : [
        findingAt(
          first.heading,
          "flat-sections",
          true,
          `${sections.length} H2 sections and no teaching subsection. Group the sections that develop one idea under a shared H2 with 2 to 4 subsections.`
        ),
      ];
}

/**
 * Holds one page's outline to the budget of decision D2: at most twelve
 * entries (review above ten), four to eight H2 sections, two to four H3 under
 * an H2 that has any (review at four), and grouped sections on a wide page.
 */
export function findBudgetFindings(
  locale: LessonVoiceLocale,
  headings: readonly OutlineHeading[]
): HeadingFinding[] {
  const sections = sectionsOf(headings);
  return [
    ...findEntryBudget(headings),
    ...findSectionCount(sections),
    ...findFanout(sections),
    ...findFlatSections(locale, sections),
  ];
}
