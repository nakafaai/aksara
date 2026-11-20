import {
  FIGURE_NAMES,
  VISUAL_NAMES,
} from "@nakafa/aksara-contracts/visual/catalog";
import { Array as Arr, HashMap, HashSet, Option, Order, pipe } from "effect";
import type { DocumentParts } from "#nakafa-content/points/document";

/**
 * The standard visuals: MathVisual, the charts, Mermaid diagrams, and video.
 * They teach, but the owner's bar for custom scenes counts them never
 * (17 November 2026: "on top of math visual charts diagram"; decision D5 of
 * 20 November 2026). Tables are HTML and layout components are markup, so
 * neither is a catalog figure to begin with.
 */
export const STANDARD_VISUALS = HashSet.make(
  "BarChart",
  "Chart",
  "FunctionChart",
  "HistogramChart",
  "MathVisual",
  "Mermaid",
  "ScatterDiagram",
  "Youtube"
);

/**
 * The custom scenes: every Visual Catalog figure that is not a standard
 * visual, which is every three.js, p5, and animated lab Nakafa draws. A new
 * catalog figure counts without a change here.
 */
const SCENE_VISUALS = HashSet.fromIterable(
  Arr.filter(FIGURE_NAMES, (name) => !HashSet.has(STANDARD_VISUALS, name))
);

/** The fewest distinct custom scenes a lesson holds; fewer blocks a changed lesson. */
export const FEWEST_SCENES = 3;

/** The custom scenes a lesson aims for; fewer is a review signal. */
export const TARGET_SCENES = 5;

/** One locale file of a lesson section: the lesson folder, the section, and the locale. */
const SECTION_FILE =
  /(?:^|\/)(?<lesson>packages\/corpus\/material\/lesson\/[^/]+\/[^/]+)\/[^/]+\/(?<locale>[a-z]{2})\.mdx$/u;

/** Tells whether one catalog component is a custom scene the bar counts. */
export function isSceneVisual(name: string): boolean {
  return HashSet.has(SCENE_VISUALS, name);
}

/** Every standard visual that the Visual Catalog does not name, which a test keeps empty. */
export function unknownStandardVisuals(): readonly string[] {
  return Arr.filter(
    Arr.fromIterable(STANDARD_VISUALS),
    (name) => !Arr.contains(VISUAL_NAMES, name)
  );
}

/**
 * Names the lesson folder and the locale of one section file. A lesson is the
 * folder below a domain, and each of its sections holds one file per locale.
 */
export function lessonOf(
  file: string
): Option.Option<{ readonly lesson: string; readonly locale: string }> {
  const groups = SECTION_FILE.exec(file)?.groups;
  const lesson = groups?.lesson;
  const locale = groups?.locale;
  return lesson === undefined || locale === undefined
    ? Option.none()
    : Option.some({ lesson, locale });
}

/** The distinct custom scenes one lesson holds in its weakest locale. */
export interface LessonScenes {
  readonly lesson: string;
  readonly locale: string;
  readonly scenes: readonly string[];
}

/**
 * Lists every lesson's distinct custom scenes across all of its sections,
 * taken from the locale with the fewest, in lesson order. Locale siblings
 * carry the same components, so the weakest locale is the lesson's count.
 */
export function lessonScenes(
  documents: Iterable<readonly [file: string, document: DocumentParts]>
): readonly LessonScenes[] {
  let inventory = HashMap.empty<
    string,
    HashMap.HashMap<string, HashSet.HashSet<string>>
  >();
  for (const [file, document] of documents) {
    const place = lessonOf(file);
    if (Option.isNone(place)) {
      continue;
    }
    const { lesson, locale } = place.value;
    const scenes = HashSet.fromIterable(
      Arr.filter(document.elements, isSceneVisual)
    );
    const locales = Option.getOrElse(HashMap.get(inventory, lesson), () =>
      HashMap.empty<string, HashSet.HashSet<string>>()
    );
    const known = Option.getOrElse(HashMap.get(locales, locale), () =>
      HashSet.empty<string>()
    );
    inventory = HashMap.set(
      inventory,
      lesson,
      HashMap.set(locales, locale, HashSet.union(known, scenes))
    );
  }
  const weakest = Order.mapInput(
    Order.Tuple([Order.Number, Order.String]),
    ([locale, scenes]: readonly [string, HashSet.HashSet<string>]) =>
      [HashSet.size(scenes), locale] as const
  );
  return pipe(
    Arr.fromIterable(inventory),
    Arr.flatMap(([lesson, locales]) =>
      pipe(
        Arr.head(Arr.sort(Arr.fromIterable(locales), weakest)),
        Option.map(([locale, scenes]) => ({
          lesson,
          locale,
          scenes: Arr.sort(Arr.fromIterable(scenes), Order.String),
        })),
        Option.toArray
      )
    ),
    Arr.sort(
      Order.mapInput(Order.String, (entry: LessonScenes) => entry.lesson)
    )
  );
}

/** A changed lesson below the scene bar or the scene target. */
export interface SceneShortfall extends LessonScenes {
  /** True below the bar, which fails the gate; false below the target only. */
  readonly blocking: boolean;
}

/**
 * Holds every changed lesson to the scene bar: at least three distinct custom
 * scenes, aiming for five. A lesson no change touched keeps its count until a
 * change touches it, so the bar rises with every revision.
 */
export function sceneShortfalls(
  lessons: readonly LessonScenes[],
  changed: HashSet.HashSet<string>
): readonly SceneShortfall[] {
  return pipe(
    lessons,
    Arr.filter(
      ({ lesson, scenes }) =>
        HashSet.has(changed, lesson) && scenes.length < TARGET_SCENES
    ),
    Arr.map((entry) => ({
      ...entry,
      blocking: entry.scenes.length < FEWEST_SCENES,
    }))
  );
}
