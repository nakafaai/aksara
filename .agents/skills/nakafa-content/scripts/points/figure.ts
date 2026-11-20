import {
  Array as Arr,
  Effect,
  FileSystem,
  HashSet,
  Option,
  Path,
} from "effect";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { parseLessonMdx, visitMdxNodes } from "#nakafa-content/mdx/parse";
import { expectShape } from "#nakafa-content/mdx/shape";
import { readBase } from "#nakafa-content/points/base";
import type { DocumentParts } from "#nakafa-content/points/document";
import { inspectDocument } from "#nakafa-content/points/document";
import { unreadable } from "#nakafa-content/points/error";
import type { LessonScenes } from "#nakafa-content/points/scene";
import { lessonOf } from "#nakafa-content/points/scene";

/**
 * The source of one document with the scene data of every MathVisual cut out:
 * the whole `scene` attribute of each MathVisual element. Two versions that
 * read the same this way differ only in a figure's frame, objects or view, a
 * correction of the figure rather than a revision of the lesson (D26). A
 * title, a description, a label or a footer is text the learner reads, so it
 * stays.
 */
export function withoutSceneData(source: string, tree: MdxNode): string {
  const ranges: (readonly [start: number, end: number])[] = [];
  visitMdxNodes(tree, (node) => {
    if (node.name !== "MathVisual") {
      return;
    }
    expectShape(node.attributes);
    for (const attribute of node.attributes) {
      const start = attribute.position?.start?.offset;
      const end = attribute.position?.end?.offset;
      expectShape(start !== undefined && end !== undefined);
      if (attribute.name === "scene") {
        ranges.push([start, end]);
      }
    }
  });
  // The parser visits elements in document order, so the ranges run forward.
  const cut = Arr.reduce(ranges, { at: 0, text: "" }, (kept, [start, end]) => ({
    at: end,
    text: kept.text + source.slice(kept.at, start),
  }));
  return cut.text + source.slice(cut.at);
}

/** Whether one modified file reads the same at the base once its figures' scene data is left out. */
const correctsFiguresOnly = Effect.fn("PointsFigure.correctsFiguresOnly")(
  function* (root: string, base: string, file: string) {
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
      same:
        withoutSceneData(source, tree) ===
        withoutSceneData(baseSource, baseTree),
    };
  }
);

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
      const reading = yield* correctsFiguresOnly(root, base, file);
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
