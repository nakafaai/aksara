import { Array as Arr, HashSet, Result } from "effect";

import type { ExamSource } from "#corpus/tryout/schema";
import { paperId } from "#corpus/tryout/track";

/**
 * The exams a release serves: each exam without its held tracks and without a
 * group left with no track, and no exam left with no group. A held track is
 * authored and checked like any other, and stays out of every release until
 * it is no longer held, such as a track whose items Nakafa cannot grade yet.
 */
export function servedExams(exams: readonly ExamSource[]) {
  return Arr.filterMap(exams, (exam) => {
    const tracks = Arr.filter(exam.tracks, ({ held }) => held !== true);
    const used = HashSet.fromIterable(Arr.map(tracks, ({ group }) => group));
    const groups = Arr.filter(exam.grouping.groups, ({ key }) =>
      HashSet.has(used, key)
    );
    return Arr.isReadonlyArrayNonEmpty(groups)
      ? Result.succeed({
          ...exam,
          grouping: { ...exam.grouping, groups },
          tracks,
        })
      : Result.failVoid;
  });
}

/** The identities of the papers of every set that the given exams serve. */
export function servedPaperIds(exams: readonly ExamSource[]) {
  return HashSet.fromIterable(
    Arr.flatMap(exams, (exam) =>
      Arr.flatMap(exam.tracks, (track) =>
        Arr.map(track.sets, (set) => paperId(exam, track, set))
      )
    )
  );
}
