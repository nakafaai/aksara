import { Array as Arr, Console, Effect } from "effect";
import type { PointsFinding } from "#nakafa-content/points/finding";
import type { SceneShortfall } from "#nakafa-content/points/scene";
import { FEWEST_SCENES, TARGET_SCENES } from "#nakafa-content/points/scene";
import type { SceneUniquenessFinding } from "#nakafa-content/points/unique";

const SHORT_REVISION_LENGTH = 7;

/** One finding together with the file it was found in. */
export interface FileFinding extends PointsFinding {
  readonly file: string;
}

/** Everything one run learned: what it read, compared, and found. */
export interface PointsReport {
  readonly base: string;
  readonly compared: number;
  readonly files: number;
  readonly findings: readonly FileFinding[];
  readonly scenes: readonly SceneShortfall[];
  readonly uniqueness?: readonly SceneUniquenessFinding[];
}

/** Shortens a revision to the length that messages and labels show. */
export function shortRevision(revision: string): string {
  return revision.slice(0, SHORT_REVISION_LENGTH);
}

/** Names one lesson's custom scenes, or says it has none. */
function sceneList(scenes: readonly string[]) {
  return scenes.length === 0 ? "none" : Arr.join(scenes, ", ");
}

/**
 * Prints every changed lesson below the scene target. A lesson below the bar
 * fails the check; one between the bar and the target is a review note.
 */
const printScenes = Effect.fn("PointsCheck.printScenes")(function* (
  scenes: readonly SceneShortfall[]
) {
  for (const { blocking, lesson, locale, scenes: names } of scenes) {
    if (blocking) {
      yield* Console.error(
        `${lesson} [custom-scenes] ${names.length} distinct custom scene(s) in ${locale} (${sceneList(names)}); a lesson needs at least ${FEWEST_SCENES} custom 3D, p5, or animated catalog visuals across its sections, and MathVisual, charts, Mermaid, and tables never count. Build the scenes its main ideas need.`
      );
    } else {
      yield* Console.log(
        `${lesson} [review: custom-scenes] ${names.length} distinct custom scenes in ${locale} (${sceneList(names)}); aim for ${TARGET_SCENES}.`
      );
    }
  }
});

/** Prints every custom visual uniqueness violation (cross-lesson or within-lesson). */
const printUniqueness = Effect.fn("PointsCheck.printUniqueness")(function* (
  uniqueness: readonly SceneUniquenessFinding[]
) {
  for (const { lesson, message, rule } of uniqueness) {
    yield* Console.error(`${lesson} [${rule}] ${message}`);
  }
});

/** Prints one report and returns the stable process exit code. */
export const printReport = Effect.fn("PointsCheck.printReport")(function* (
  report: PointsReport
) {
  for (const { column, file, line, message, rule } of report.findings) {
    yield* Console.error(`${file}:${line}:${column} [${rule}] ${message}`);
  }
  const uniqueness = report.uniqueness ?? [];
  yield* printScenes(report.scenes);
  yield* printUniqueness(uniqueness);
  const revision = shortRevision(report.base);
  const short = Arr.filter(report.scenes, ({ blocking }) => blocking).length;
  if (report.findings.length === 0 && short === 0 && uniqueness.length === 0) {
    yield* Console.log(
      `Points check passed for ${report.files} files and compared ${report.compared} changed files with ${revision}.`
    );
    return 0;
  }
  const affected = new Set(report.findings.map(({ file }) => file)).size;
  const found = [
    ...(report.findings.length === 0
      ? []
      : [
          `${report.findings.length} finding(s) in ${affected} of ${report.files} files`,
        ]),
    ...(short === 0 ? [] : [`${short} lesson(s) below the custom scene bar`]),
    ...(uniqueness.length === 0
      ? []
      : [`${uniqueness.length} custom visual uniqueness violation(s)`]),
  ];
  yield* Console.error(
    `Points check found ${found.join(" and ")}, compared with ${revision}.`
  );
  return 1;
});
