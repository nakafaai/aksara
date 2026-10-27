import { ExamProfileSchema } from "@nakafa/aksara-contracts/assessment/profile";
import { Array as Arr, Effect, Schema } from "effect";
import { mapLocalizedSource } from "#corpus/locale/source";
import type { ExamSource, TrackSource } from "#corpus/tryout/schema";

/**
 * How long after a deadline a try-out answer already in flight still counts as
 * on time. ADR 0013 of Nakafa sets the write allowance to a few seconds and
 * never longer than one presence lease.
 */
const WRITE_ALLOWANCE_SECONDS = 5;

/**
 * How long after a deadline a reconciling try-out keeps queued answers: one
 * presence lease of Nakafa, which closes a session after 2.5 heartbeats of 30
 * seconds (`PRESENCE_INTERVAL` in `confect/exams/presence.ts`).
 */
const GRACE_SECONDS = 75;

/** The one profile of a track failed its contract. */
export class ExamProfileSourceError extends Schema.TaggedError<
  ExamProfileSourceError,
  { readonly brand: unique symbol }
>()("ExamProfileSourceError", {
  cause: Schema.Unknown,
  profile: Schema.String,
}) {}

/** The identity of the profile of one track. */
export function profileId(exam: ExamSource, track: TrackSource) {
  return `${exam.countryKey}/${exam.examKey}/${track.key}`;
}

/** The title of a translation map in each locale it is written in. */
function names(translations: TrackSource["translations"]) {
  return mapLocalizedSource(translations, ({ title }) => title);
}

/**
 * Builds the exam profile of one track. Every Nakafa try-out moves freely
 * within a section, offers mark for review and no calculator, scores each
 * interaction all or nothing, lets a sampled math verdict score, and has no
 * break and no accommodation catalog yet.
 */
export const makeExamProfile = Effect.fn("AksaraCorpus.makeExamProfile")(
  function* (exam: ExamSource, track: TrackSource) {
    const { profile } = track;
    const kinds = Arr.dedupe(
      Arr.flatMap(profile.sections, ({ interactions }) => interactions)
    );
    const id = profileId(exam, track);
    return yield* Schema.decodeUnknownEffect(ExamProfileSchema)(
      {
        accommodations: { assigned: [], recorded: [], universal: [] },
        breaks: [],
        defaults: Arr.map(
          Arr.filter(kinds, (kind) => kind !== "extendedText"),
          (interaction) => ({ interaction, rule: { kind: "allOrNothing" } })
        ),
        graceSeconds: GRACE_SECONDS,
        id,
        names: names(profile.names),
        report: profile.report,
        sampledMath: "score",
        ...(profile.scale === undefined ? {} : { scale: profile.scale }),
        scoring: profile.scoring,
        sections: Arr.map(profile.sections, (section) => ({
          id: section.key,
          interactions: section.interactions,
          items: section.items,
          names: names(section.translations),
          navigation: "free",
          seconds: section.seconds,
          tools: ["mark-for-review"],
        })),
        totalSeconds: Arr.reduce(
          profile.sections,
          0,
          (total, { seconds }) => total + seconds
        ),
        writeAllowanceSeconds: WRITE_ALLOWANCE_SECONDS,
      },
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        (cause) => new ExamProfileSourceError({ cause, profile: id })
      )
    );
  }
);
