import { Array as Arr, Equal, HashSet } from "effect";
import type { AssessmentDocument } from "#contracts/assessment/document";
import { documentPlacements } from "#contracts/assessment/document";
import { hasDistinctIds, hasUniqueIds } from "#contracts/assessment/identity";
import type { Interaction } from "#contracts/assessment/interaction";
import { canSitInText } from "#contracts/assessment/interaction";
import type { InteractionKey } from "#contracts/assessment/key";
import type { ScoringOverride } from "#contracts/assessment/scoring";
import { supportsRule, takesRubric } from "#contracts/assessment/scoring";

type Place = ReturnType<typeof documentPlacements>[number];

/**
 * Checks that the prompt places one interaction where its kind belongs: a
 * field exactly once, in text or as a block; a gap match once for each gap, in
 * the text; every other kind exactly once, as a block.
 */
function isPlaced(interaction: Interaction, places: readonly Place[]) {
  const own = Arr.filter(
    places,
    ({ attrs }) => attrs.interaction === interaction.id
  );
  if (interaction.kind === "gapMatch") {
    return (
      own.length === interaction.gaps.length &&
      Arr.every(interaction.gaps, ({ id }) =>
        Arr.some(
          own,
          (place) =>
            place.type === "inlineInteraction" && place.attrs.gap === id
        )
      )
    );
  }
  return (
    own.length === 1 &&
    Arr.every(
      own,
      (place) =>
        place.type === "interaction" ||
        (canSitInText(interaction.kind) && place.attrs.gap === null)
    )
  );
}

/**
 * Checks that the interactions of a version and its prompt agree: each
 * interaction has its own identifier and sits in the prompt as its kind
 * allows, and the prompt places no interaction that the version does not have.
 */
export function hasPlacedInteractions(version: {
  readonly interactions: readonly Interaction[];
  readonly prompt: AssessmentDocument;
}) {
  const places = documentPlacements(version.prompt);
  const known = HashSet.fromIterable(
    Arr.map(version.interactions, ({ id }) => id)
  );
  return (
    hasUniqueIds(version.interactions) &&
    Arr.every(places, ({ attrs }) => HashSet.has(known, attrs.interaction)) &&
    Arr.every(version.interactions, (interaction) =>
      isPlaced(interaction, places)
    )
  );
}

/**
 * Checks the scoring rules that a version sets itself: each names one of its
 * interactions once, and fits its kind. An extended text and a sketch have no
 * default, so each must carry its rubric.
 */
export function hasFittingRules(version: {
  readonly interactions: readonly Interaction[];
  readonly scoring: readonly ScoringOverride[];
}) {
  return (
    hasDistinctIds(
      Arr.map(version.scoring, ({ interaction }) => interaction)
    ) &&
    Arr.every(version.scoring, ({ interaction, rule }) =>
      Arr.some(
        version.interactions,
        (candidate) =>
          candidate.id === interaction && supportsRule(candidate.kind, rule)
      )
    ) &&
    Arr.every(
      Arr.filter(version.interactions, ({ kind }) => takesRubric(kind)),
      ({ id }) =>
        Arr.some(
          version.scoring,
          ({ interaction, rule }) =>
            interaction === id && rule.kind === "rubric"
        )
    )
  );
}

/** Checks that two lists name the same identifiers, in any order. */
function sameIds(left: readonly string[], right: readonly string[]) {
  return Equal.equals(HashSet.fromIterable(left), HashSet.fromIterable(right));
}

/**
 * Checks that a version's key and its rubrics meet: the key answers every
 * sketch of the version, and each sketch it answers is scored by a rubric of
 * the version with exactly the key's criteria, so no feature is worth no points
 * and no points go unchecked. It is the check where a key and its version's
 * scoring meet, so it needs both records.
 */
export function hasKeyedRubrics(
  version: {
    readonly interactions: readonly Interaction[];
    readonly scoring: readonly ScoringOverride[];
  },
  key: { readonly answers: readonly InteractionKey[] }
) {
  return (
    Arr.every(
      Arr.filter(version.interactions, ({ kind }) => kind === "sketch"),
      ({ id }) =>
        Arr.some(
          key.answers,
          (answer) => answer.kind === "sketch" && answer.interaction === id
        )
    ) &&
    Arr.every(
      key.answers,
      (answer) =>
        answer.kind !== "sketch" ||
        Arr.some(
          version.scoring,
          ({ interaction, rule }) =>
            interaction === answer.interaction &&
            rule.kind === "rubric" &&
            sameIds(
              Arr.map(rule.criteria, ({ id }) => id),
              Arr.map(answer.criteria, ({ criterion }) => criterion)
            )
        )
    )
  );
}
