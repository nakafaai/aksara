import { compileContentDocument } from "@nakafa/aksara-compiler/assessment/document";
import {
  hashPaper,
  hashStimulusVersion,
} from "@nakafa/aksara-contracts/assessment/hash";
import {
  ItemFamilyIdSchema,
  PaperIdSchema,
  StimulusIdSchema,
} from "@nakafa/aksara-contracts/assessment/identity";
import type { StimulusReference } from "@nakafa/aksara-contracts/assessment/item";
import {
  type Paper,
  PaperSchema,
  verifyPaperPlaces,
  verifyPaperStimuli,
} from "@nakafa/aksara-contracts/assessment/paper";
import { StimulusVersionSchema } from "@nakafa/aksara-contracts/assessment/stimulus";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
  activeAppLocaleCode,
  ContentLanguageSchema,
} from "@nakafa/aksara-contracts/locale";
import type { QuestionSet } from "@nakafa/aksara-corpus/question-bank/source";
import type { PaperPlan } from "@nakafa/aksara-corpus/tryout/projection";
import { Array as Arr, Effect, Option, Record as Rec, Schema } from "effect";
import { assembleItem, readAssessmentSource } from "#publisher/assessment/item";

/** The identity of one question or reading: its set and its folder. */
function bankId(set: string, folder: string) {
  return `${set}/${folder}`;
}

/** Compiles the shared readings of one set, each in every language it is written in. */
const compileStimuli = Effect.fn("AksaraPublisher.compileStimuli")(function* (
  checkoutRoot: string,
  set: QuestionSet
) {
  return yield* Effect.forEach(set.stimuli, (stimulus) =>
    Effect.gen(function* () {
      const id = StimulusIdSchema.make(bankId(set.path, stimulus.key));
      const versions = yield* Effect.forEach(stimulus.languages, (language) =>
        Effect.gen(function* () {
          const source = yield* readAssessmentSource(
            checkoutRoot,
            `${stimulus.sourceRoot}/stimulus.${language}.mdx`
          );
          const body = {
            deliveryLanguage: ContentLanguageSchema.make(language),
            document: yield* compileContentDocument(source),
            id,
          };
          return StimulusVersionSchema.make({
            ...body,
            hash: yield* hashStimulusVersion(body),
          });
        })
      );
      return { id, key: stimulus.key, versions };
    })
  );
});

/** Assembles every question of one set, each naming the version of its reading in its language. */
const assembleSet = Effect.fn("AksaraPublisher.assembleSet")(function* (
  checkoutRoot: string,
  set: QuestionSet
) {
  const stimuli = yield* compileStimuli(checkoutRoot, set);
  const items = yield* Effect.forEach(set.questions, (question) =>
    assembleItem({
      checkoutRoot,
      familyId: ItemFamilyIdSchema.make(
        bankId(set.path, `question-${question.number}`)
      ),
      question,
      reading: Option.map(
        Arr.findFirst(stimuli, ({ key }) => key === question.item.stimulus),
        ({ id, versions }) => ({
          id,
          versions: Rec.fromEntries(
            Arr.map(versions, (version): [string, StimulusReference] => [
              version.deliveryLanguage,
              { hash: version.hash, id },
            ])
          ),
        })
      ),
    })
  );
  return { items, stimuli };
});

/**
 * Freezes the paper of one plan: each section places each of its questions
 * with its version in every language of the section, in the section's order,
 * and the paper lists the readings those versions use. The places and the
 * readings are checked before the paper is hashed. The paper serves the
 * locales every one of its sets is explained in.
 */
export const freezePaper = Effect.fn("AksaraPublisher.freezePaper")(function* (
  checkoutRoot: string,
  plan: PaperPlan,
  profile: Paper["profile"]
) {
  const sections = yield* Effect.forEach(plan.sections, (section) =>
    Effect.map(assembleSet(checkoutRoot, section.set), (assembled) => ({
      assembled,
      languages: section.languages,
      places: Arr.map(assembled.items, (item) => ({
        family: item.family.id,
        versions: Arr.getSomes(
          Arr.map(section.languages, (language) =>
            Arr.findFirst(
              item.versions,
              ({ deliveryLanguage }) => deliveryLanguage === language
            )
          )
        ),
      })),
      section: section.key,
    }))
  );
  const versions = Arr.flatMap(sections, ({ places }) =>
    Arr.flatMap(places, (place) => place.versions)
  );
  const keys = Arr.flatMap(sections, ({ assembled }) =>
    Arr.flatMap(assembled.items, (item) => item.keys)
  );
  const stimuli = Arr.flatMap(versions, ({ stimulus }) =>
    Option.toArray(Option.fromUndefinedOr(stimulus))
  );
  const paper = yield* Schema.decodeUnknownEffect(PaperSchema)({
    id: PaperIdSchema.make(plan.id),
    profile,
    sections: Arr.map(sections, ({ languages, places, section }) => ({
      languages,
      placements: Arr.map(places, ({ family, versions: placed }) => ({
        family,
        versions: Arr.map(placed, ({ deliveryLanguage, hash }) => ({
          hash,
          language: deliveryLanguage,
        })),
      })),
      section,
    })),
    stimuli: Arr.dedupeWith(
      stimuli,
      (left, right) => left.id === right.id && left.hash === right.hash
    ),
  });
  yield* verifyPaperPlaces(paper, versions, keys);
  yield* verifyPaperStimuli(paper, versions);
  const appLocales = yield* Schema.decodeUnknownEffect(
    ActiveAppLocaleListSchema
  )(
    Arr.filter(ACTIVE_APP_LOCALES, (appLocale) =>
      Arr.every(plan.sections, ({ set }) =>
        Arr.contains(set.explanations, activeAppLocaleCode(appLocale))
      )
    )
  );
  return {
    appLocales,
    assembled: Arr.map(sections, ({ assembled }) => assembled),
    hash: yield* hashPaper(paper),
    paper,
  };
});
