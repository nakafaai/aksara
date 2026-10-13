import { Array as Arr, HashSet } from "effect";

import {
  type AssessmentDocument,
  documentPlacements,
} from "#contracts/assessment/document";
import { hasDistinctIds, hasUniqueIds } from "#contracts/assessment/identity";
import {
  canSitInText,
  type Interaction,
} from "#contracts/assessment/interaction";
import {
  type ScoringOverride,
  supportsRule,
} from "#contracts/assessment/scoring";

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
 * interactions once, and fits it. An extended text has no default, so it must
 * carry its rubric.
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
          candidate.id === interaction && supportsRule(candidate, rule)
      )
    ) &&
    Arr.every(
      Arr.filter(version.interactions, ({ kind }) => kind === "extendedText"),
      ({ id }) =>
        Arr.some(
          version.scoring,
          ({ interaction, rule }) =>
            interaction === id && rule.kind === "rubric"
        )
    )
  );
}
