import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { AppLocaleSchema } from "#contracts/locale";
import {
  hasLosslessHistoricalArtifactMapping,
  hasLosslessHistoricalCatalogMapping,
  hasLosslessHistoricalPlacementMapping,
} from "#contracts/migration/tryout/history/lossless";
import {
  historicalCatalogRows,
  historicalPlacement,
} from "#contracts/test/history-row";
import { historicalArtifact } from "#contracts/test/history-runtime";
import { TryoutCatalogRowSchema } from "#contracts/tryout/catalog";
import {
  deliveryLanguageForSection,
  questionArtifactLocaleForSection,
} from "#contracts/tryout/language";
import { TryoutPlacementSchema } from "#contracts/tryout/placement";

/** Converts one retained catalog row through only the locale field rename. */
function currentCatalogRow(source: (typeof historicalCatalogRows)[number]) {
  const { locale, ...fields } = source;
  return Schema.decodeSync(TryoutCatalogRowSchema)({
    ...fields,
    appLocale: locale,
  });
}

/** Converts the retained placement while deriving current language identities. */
function currentPlacement() {
  const { locale, title: _title, ...fields } = historicalPlacement;
  const appLocale = AppLocaleSchema.make(locale);
  return Schema.decodeSync(TryoutPlacementSchema)({
    ...fields,
    answerArtifactLocale: locale,
    appLocale,
    contentHash: "f".repeat(64),
    deliveryLanguage: deliveryLanguageForSection(
      historicalPlacement.sectionKey,
      appLocale
    ),
    questionArtifactLocale: questionArtifactLocaleForSection(
      historicalPlacement.sectionKey,
      appLocale
    ),
  });
}

/** Converts one retained artifact while preserving every executable byte. */
function currentArtifact(): SignedContentArtifact {
  const { format: _format, locale, ...fields } = historicalArtifact.payload;
  return Schema.decodeSync(SignedContentArtifactSchema)({
    ...historicalArtifact,
    payload: {
      ...fields,
      artifactLocale: locale,
      format: "mdx-function-body",
    },
  });
}

describe("lossless retained try-out conversion", () => {
  it("preserves every catalog discriminator through the locale rename", () => {
    expect(
      historicalCatalogRows.map((source) =>
        hasLosslessHistoricalCatalogMapping(source, currentCatalogRow(source))
      )
    ).toEqual(historicalCatalogRows.map(() => true));
    const country = historicalCatalogRows.find(
      ({ kind }) => kind === "country"
    );
    expect(country).toBeDefined();
    if (!country) {
      return;
    }
    expect(
      hasLosslessHistoricalCatalogMapping(country, {
        ...currentCatalogRow(country),
        title: "Changed title",
      })
    ).toBe(false);
  });

  it("preserves placement semantics while adding current derived identities", () => {
    const target = currentPlacement();
    const [firstChoice, ...remainingChoices] = target.choices;
    const changed = Schema.decodeSync(TryoutPlacementSchema)({
      ...target,
      choices: [
        { ...firstChoice, label: `${firstChoice.label} changed` },
        ...remainingChoices,
      ],
    });

    expect(
      hasLosslessHistoricalPlacementMapping(historicalPlacement, target)
    ).toBe(true);
    expect(
      hasLosslessHistoricalPlacementMapping(historicalPlacement, changed)
    ).toBe(false);
  });

  it("preserves exact authored and compiled artifact bytes", () => {
    const target = currentArtifact();
    const historicalFormat = {
      ...target,
      payload: { ...target.payload, format: "mdx-function-body-v1" },
    } as unknown as SignedContentArtifact;

    expect(
      hasLosslessHistoricalArtifactMapping(historicalArtifact, target)
    ).toBe(true);
    expect(
      hasLosslessHistoricalArtifactMapping(historicalArtifact, {
        ...target,
        payload: { ...target.payload, rawMdx: "Changed source" },
      })
    ).toBe(false);
    expect(
      hasLosslessHistoricalArtifactMapping(historicalArtifact, historicalFormat)
    ).toBe(false);
  });
});
