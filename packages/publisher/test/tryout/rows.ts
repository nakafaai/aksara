import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
  DeliveryLanguageSchema,
} from "@nakafa/aksara-contracts/locale";
import type { TryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/catalog";
import type { TryoutPlacementRecord } from "@nakafa/aksara-contracts/tryout/placement";
import { TryoutContentHashSchema } from "@nakafa/aksara-contracts/tryout/spec";

const questionRoot =
  "question-bank/tryout/test-country/test-exam/test-section/test-set/question-1";

/** Fixed test-only country row for the try-out batch canonical byte pin. */
export const tryoutCatalogRecord: TryoutCatalogRecord = {
  row: {
    appLocale: AppLocaleSchema.make("en"),
    countryCode: "ZZ",
    countryKey: "test-country",
    graph: {
      alignmentId: "alignment:test-country",
      assetId: "asset:test-country",
      conceptId: "concept:test-country",
      learningObjectId: "lo:test-country",
      lensId: "lens:test-country",
    },
    kind: "country",
    order: 1,
    publicPath: PublicPathSchema.make("try-out/test-country"),
    sourceRevision: "2026-01-01",
    title: "Test Country",
  },
  rowHash: Sha256HashSchema.make(
    "sha256:4b55966355fbb5395389147acf42465e939231cc716fb9e9cee862b043253984"
  ),
};

/** Fixed test-only artifact-bound placement for the try-out batch canonical byte pin. */
export const tryoutPlacementRecord: TryoutPlacementRecord = {
  row: {
    answerArtifactHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
    answerArtifactLocale: ArtifactLocaleSchema.make("en"),
    answerContentKey: ContentKeySchema.make(`${questionRoot}/answer`),
    appLocale: AppLocaleSchema.make("en"),
    contentHash: TryoutContentHashSchema.make("d".repeat(64)),
    countryKey: "test-country",
    deliveryLanguage: DeliveryLanguageSchema.make("en"),
    examKey: "test-exam",
    languagePolicy: { kind: "app-locale" },
    questionArtifactHash: Sha256HashSchema.make(`sha256:${"c".repeat(64)}`),
    questionArtifactLocale: ArtifactLocaleSchema.make("en"),
    questionContentKey: ContentKeySchema.make(`${questionRoot}/question`),
    questionOrder: 1,
    questionSourcePath: CorpusSourcePathSchema.make(
      `packages/corpus/${questionRoot}`
    ),
    rendererDomain: "mathematics",
    response: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Test option one.",
          optionKey: "option-1",
          order: 1,
        },
        {
          isCorrect: true,
          label: "Test option café ✓.",
          optionKey: "option-2",
          order: 2,
        },
        {
          isCorrect: false,
          label: "Test option three.",
          optionKey: "option-3",
          order: 3,
        },
      ],
    },
    scope: "server",
    sectionKey: "test-section",
    setKey: "test-set",
    sourceRevision: "2026-01-01",
    trackKey: "test-track",
  },
  rowHash: Sha256HashSchema.make(
    "sha256:8ac34761f6efe4e11c6cb6c5e6f90321651b97dab3e582616c8f1635aef80f64"
  ),
};
