import {
  Array as Arr,
  Effect,
  FileSystem,
  HashSet,
  Option,
  Path,
} from "effect";
import { correctsFiguresOnly } from "#nakafa-content/mdx/figure";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { readBase } from "#nakafa-content/points/base";
import type { DocumentParts } from "#nakafa-content/points/document";
import { inspectDocument } from "#nakafa-content/points/document";
import { unreadable } from "#nakafa-content/points/error";
import type { LessonScenes } from "#nakafa-content/points/scene";
import { lessonOf } from "#nakafa-content/points/scene";

/** Reads one modified file at the base: its parts there, and whether the change only corrects its figures. */
const readCorrection = Effect.fn("PointsFigure.readCorrection")(function* (
  root: string,
  base: string,
  file: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const source = yield* fileSystem
    .readFileString(path.join(root, file))
    .pipe(Effect.mapError(unreadable(file)));
  const baseSource = yield* readBase(root, base, file);
  // The gate parsed both versions before it reads their figures, so they parse here too.
  const tree = parseLessonMdx(source, file);
  const baseTree = parseLessonMdx(baseSource, `${file} at base`);
  return {
    base: inspectDocument(baseTree),
    same: correctsFiguresOnly(
      { source: baseSource, tree: baseTree },
      { source, tree }
    ),
  };
});

/**
 * Reads which touched lessons a change only corrects figures in (D26). Every
 * touched file of such a lesson is modified in place, never added, removed or
 * moved, and differs from the base only in MathVisual scene data. The result
 * holds those lessons and the base parts of their touched files, so the gate
 * can see that no custom scene was lost.
 */
export const figureCorrections = Effect.fn("PointsFigure.figureCorrections")(
  function* (
    root: string,
    base: string,
    touched: readonly string[],
    changed: ReadonlyMap<string, string>
  ) {
    let revised = HashSet.empty<string>();
    let corrected = HashSet.empty<string>();
    const baseParts = new Map<string, DocumentParts>();
    for (const file of touched) {
      const place = lessonOf(file);
      if (Option.isNone(place)) {
        continue;
      }
      const { lesson } = place.value;
      if (changed.get(file) !== file) {
        revised = HashSet.add(revised, lesson);
        continue;
      }
      const reading = yield* readCorrection(root, base, file);
      baseParts.set(file, reading.base);
      if (reading.same) {
        corrected = HashSet.add(corrected, lesson);
      } else {
        revised = HashSet.add(revised, lesson);
      }
    }
    return {
      baseParts,
      lessons: HashSet.difference(corrected, revised),
    };
  }
);

/**
 * The figure-corrected lessons that kept every custom scene: their count in
 * the change is at least their count at the base, in each lesson's weakest
 * locale. Only these pass the scene bar without meeting it.
 */
export function keptScenes(
  corrected: HashSet.HashSet<string>,
  now: readonly LessonScenes[],
  before: readonly LessonScenes[]
): HashSet.HashSet<string> {
  return HashSet.filter(corrected, (lesson) => {
    /** The lesson's count of distinct custom scenes in one reading of the corpus. */
    const count = (entries: readonly LessonScenes[]) =>
      Arr.reduce(
        Arr.filter(entries, (entry) => entry.lesson === lesson),
        0,
        (_, { scenes }) => scenes.length
      );
    return count(now) >= count(before);
  });
}
