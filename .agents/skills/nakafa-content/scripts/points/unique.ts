import { Array as Arr, HashMap, HashSet, Option, Order } from "effect";
import type { DocumentParts } from "#nakafa-content/points/document";
import { isSceneVisual, lessonOf } from "#nakafa-content/points/scene";

/** One blocking visual uniqueness violation for a lesson (Rule 18). */
export interface SceneUniquenessFinding {
  readonly lesson: string;
  readonly message: string;
  readonly rule: "duplicate-scene-across-lessons" | "repeated-scene-in-lesson";
  readonly scene: string;
}

/** How many other lessons a cross-lesson uniqueness message names before summarizing. */
const NAMED_LESSONS = 3;

type LocaleSceneCounts = HashMap.HashMap<
  string,
  HashMap.HashMap<string, number>
>;

/** Names the other lessons that already own one custom scene component. */
function describeOtherLessons(lessons: readonly string[]): string {
  const sorted = Arr.sort(lessons, Order.String);
  const rest = sorted.length - NAMED_LESSONS;
  const head = Arr.join(sorted.slice(0, NAMED_LESSONS), ", ");
  return rest > 0 ? `${head}, and ${rest} more` : head;
}

/** Indexes custom scene owners across lessons and per-locale counts within each lesson. */
function indexScenes(
  documents: Iterable<readonly [file: string, document: DocumentParts]>
) {
  let owners = HashMap.empty<string, HashSet.HashSet<string>>();
  let counts = HashMap.empty<string, LocaleSceneCounts>();

  for (const [file, document] of documents) {
    const place = lessonOf(file);
    if (Option.isNone(place)) {
      continue;
    }
    const { lesson, locale } = place.value;
    const scenes = Arr.filter(document.elements, isSceneVisual);
    if (scenes.length === 0) {
      continue;
    }
    const locales = Option.getOrElse(HashMap.get(counts, lesson), () =>
      HashMap.empty<string, HashMap.HashMap<string, number>>()
    );
    let perScene = Option.getOrElse(HashMap.get(locales, locale), () =>
      HashMap.empty<string, number>()
    );
    for (const scene of scenes) {
      const knownOwners = Option.getOrElse(HashMap.get(owners, scene), () =>
        HashSet.empty<string>()
      );
      owners = HashMap.set(owners, scene, HashSet.add(knownOwners, lesson));
      const previous = Option.getOrElse(HashMap.get(perScene, scene), () => 0);
      perScene = HashMap.set(perScene, scene, previous + 1);
    }
    counts = HashMap.set(
      counts,
      lesson,
      HashMap.set(locales, locale, perScene)
    );
  }
  return { counts, owners };
}

/** Checks whether any custom scene used by `lesson` is already owned by another lesson. */
function crossLessonFindings(
  lesson: string,
  locales: LocaleSceneCounts,
  owners: HashMap.HashMap<string, HashSet.HashSet<string>>
): SceneUniquenessFinding[] {
  const used = HashSet.fromIterable(
    Arr.flatMap(Arr.fromIterable(HashMap.values(locales)), (perScene) =>
      Arr.fromIterable(HashMap.keys(perScene))
    )
  );
  const sortedScenes = Arr.sort(Arr.fromIterable(used), Order.String);
  return Arr.flatMap(sortedScenes, (scene): SceneUniquenessFinding[] => {
    const others = Arr.filter(
      Arr.fromIterable(Option.getOrThrow(HashMap.get(owners, scene))),
      (owner) => owner !== lesson
    );
    return others.length === 0
      ? []
      : [
          {
            lesson,
            message: `reuses custom visual <${scene}> already owned by ${describeOtherLessons(others)}. Every lesson must own unique custom visuals with zero cross-lesson component reuse.`,
            rule: "duplicate-scene-across-lessons",
            scene,
          },
        ];
  });
}

/** Checks whether any custom scene appears more than once in one locale of `lesson`. */
function repeatedSceneFindings(
  lesson: string,
  locales: LocaleSceneCounts
): SceneUniquenessFinding[] {
  const sortedLocales = Arr.sortWith(
    Arr.fromIterable(HashMap.entries(locales)),
    (entry) => entry[0],
    Order.String
  );
  return Arr.flatMap(sortedLocales, ([locale, perScene]) => {
    const sortedScenes = Arr.sortWith(
      Arr.fromIterable(HashMap.entries(perScene)),
      (entry) => entry[0],
      Order.String
    );
    return Arr.flatMap(
      sortedScenes,
      ([scene, count]): SceneUniquenessFinding[] =>
        count > 1
          ? [
              {
                lesson,
                message: `repeats custom visual <${scene}> ${count} times in ${locale}. Each custom visual component may appear at most once per lesson instead of being repeated as filler.`,
                rule: "repeated-scene-in-lesson",
                scene,
              },
            ]
          : []
    );
  });
}

/**
 * Enforces Rule 18 global custom visual uniqueness:
 * 1. Zero cross-lesson reuse: no custom visual component may appear in two
 *    different lesson folders (`duplicate-scene-across-lessons`).
 * 2. Zero within-lesson filler repetition: no custom visual component may
 *    appear more than once inside one lesson in the same locale
 *    (`repeated-scene-in-lesson`).
 * Checks every lesson in `checked` against the complete corpus in `documents`.
 */
export function sceneUniquenessFindings(
  documents: Iterable<readonly [file: string, document: DocumentParts]>,
  checked: HashSet.HashSet<string>
): readonly SceneUniquenessFinding[] {
  const { counts, owners } = indexScenes(documents);
  const filteredLessons = Arr.filter(
    Arr.fromIterable(HashMap.entries(counts)),
    (entry) => HashSet.has(checked, entry[0])
  );
  const targetLessons = Arr.sortWith(
    filteredLessons,
    (entry) => entry[0],
    Order.String
  );
  return Arr.flatMap(targetLessons, ([lesson, locales]) => [
    ...crossLessonFindings(lesson, locales, owners),
    ...repeatedSceneFindings(lesson, locales),
  ]);
}
