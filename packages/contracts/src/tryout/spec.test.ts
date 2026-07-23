import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import { ContentProjectionSchema } from "#contracts/projection/spec";
import {
  compareTryoutCatalog,
  TryoutCatalogRowSchema,
  TryoutChoiceSchema,
  TryoutCountryCodeSchema,
  TryoutKeySchema,
  TryoutPlacementSchema,
  TryoutPlacementSourceSchema,
  tryoutCatalogIdentity,
} from "#contracts/tryout/spec";

const common = {
  graph: {
    alignmentId: "alignment:tryout:indonesia:catalog:tryout-country:indonesia",
    assetId: "asset:en:tryout:indonesia:catalog:tryout-country:indonesia",
    conceptId: "concept:tryout:indonesia",
    learningObjectId: "lo:tryout-country:indonesia",
    lensId: "lens:tryout:indonesia:catalog",
  },
  locale: "en",
  sourceRevision: "2026-07-05",
  title: "SNBT",
} as const;
const catalogRows = [
  {
    ...common,
    countryCode: "ID",
    countryKey: "indonesia",
    kind: "country",
    publicPath: "try-out/indonesia",
  },
  {
    ...common,
    countryKey: "indonesia",
    examKey: "snbt",
    kind: "exam",
    publicPath: "try-out/indonesia/snbt",
    scoringStrategy: "irt",
  },
  {
    ...common,
    countryKey: "indonesia",
    examKey: "snbt",
    kind: "track",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027",
    questionCount: 300,
    sectionCount: 14,
    setCount: 2,
    trackKey: "2027",
    trackKind: "year",
    visibleSectionCount: 14,
  },
  {
    ...common,
    countryKey: "indonesia",
    examKey: "snbt",
    kind: "set",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027/set-1",
    questionCount: 150,
    scoringStrategy: "irt",
    sectionCount: 7,
    setKey: "set-1",
    trackKey: "2027",
    visibleSectionCount: 7,
  },
  {
    ...common,
    countryKey: "indonesia",
    examKey: "snbt",
    kind: "section",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027/set-1/quantitative-knowledge",
    questionCount: 20,
    questionSourcePath:
      "packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1",
    sectionKey: "quantitative-knowledge",
    setKey: "set-1",
    timeLimitSeconds: 1800,
    trackKey: "2027",
    visibility: "visible",
  },
] as const;
const placement = Schema.decodeUnknownSync(TryoutPlacementSourceSchema)({
  answerContentKey:
    "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/answer",
  choices: [
    {
      isCorrect: true,
      label: "Test choice",
      optionKey: "option-1",
      order: 1,
    },
  ],
  countryKey: "indonesia",
  examKey: "snbt",
  locale: "en",
  questionContentKey:
    "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question",
  questionOrder: 1,
  questionSourcePath:
    "packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1",
  rendererDomain: "snbt-quant",
  scope: "server",
  sectionKey: "quantitative-knowledge",
  setKey: "set-1",
  sourceRevision: "2026-07-05",
  trackKey: "2027",
});
/** Formats one expected strict schema failure for message assertions. */
function formatFailure(result: Either.Either<unknown, ParseResult.ParseError>) {
  if (Either.isRight(result)) {
    throw new Error("Expected schema decoding to fail.");
  }
  return ParseResult.TreeFormatter.formatErrorSync(result.left);
}
describe("try-out contracts", () => {
  it("decodes every hierarchy row and builds distinct identities", () => {
    const decoded = catalogRows.map((row) =>
      Schema.decodeUnknownSync(TryoutCatalogRowSchema)(row)
    );

    expect(decoded.map(({ kind }) => kind)).toEqual([
      "country",
      "exam",
      "track",
      "set",
      "section",
    ]);
    expect(new Set(decoded.map(tryoutCatalogIdentity)).size).toBe(5);
    expect([...decoded].sort(compareTryoutCatalog)).toHaveLength(5);
  });
  it("rejects malformed keys, country codes, and option identities", () => {
    expect(
      formatFailure(Schema.decodeUnknownEither(TryoutKeySchema)("Not-Kebab"))
    ).toContain("Invalid try-out key.");
    expect(
      formatFailure(Schema.decodeUnknownEither(TryoutCountryCodeSchema)("id"))
    ).toContain("Invalid country code.");
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(TryoutChoiceSchema)({
          isCorrect: true,
          label: "Test",
          optionKey: "A",
          order: 1,
        })
      )
    ).toBe(true);
  });

  it("rejects incoherent hierarchy counts, routes, and choices", () => {
    const invalid = [
      { ...catalogRows[2], visibleSectionCount: 15 },
      { ...catalogRows[3], visibleSectionCount: 6 },
      { ...catalogRows[4], publicPath: undefined },
      {
        ...catalogRows[4],
        visibility: "internal-entry",
      },
    ];
    for (const row of invalid) {
      expect(
        Either.isLeft(Schema.decodeUnknownEither(TryoutCatalogRowSchema)(row))
      ).toBe(true);
    }
    expect(
      formatFailure(
        Schema.decodeUnknownEither(TryoutCatalogRowSchema)(invalid[0])
      )
    ).toContain("Visible track sections cannot exceed all sections.");
    expect(
      formatFailure(
        Schema.decodeUnknownEither(TryoutCatalogRowSchema)(invalid[1])
      )
    ).toContain("Set section counts do not match their visibility.");
    expect(
      formatFailure(
        Schema.decodeUnknownEither(TryoutCatalogRowSchema)(invalid[2])
      )
    ).toContain("Section visibility does not match its public path.");

    for (const choices of [
      [
        {
          isCorrect: true,
          label: "Test",
          optionKey: "option-2",
          order: 1,
        },
      ],
      [
        {
          isCorrect: false,
          label: "Test",
          optionKey: "option-1",
          order: 1,
        },
      ],
    ]) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(TryoutPlacementSourceSchema)({
            ...placement,
            choices,
          })
        )
      ).toBe(true);
    }
    expect(
      formatFailure(
        Schema.decodeUnknownEither(TryoutPlacementSourceSchema)({
          ...placement,
          choices: [
            {
              isCorrect: false,
              label: "Test",
              optionKey: "option-1",
              order: 1,
            },
          ],
        })
      )
    ).toContain(
      "Choices require contiguous option identities and one correct answer."
    );
  });

  it("keeps correctness outside public content projections", () => {
    expect(placement.scope).toBe("server");
    expect("publicPath" in placement).toBe(false);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ContentProjectionSchema)(placement)
      )
    ).toBe(true);
  });

  it("rejects incomplete and invented hierarchy fields", () => {
    const decode = Schema.decodeUnknownEither(TryoutCatalogRowSchema, {
      onExcessProperty: "error",
    });

    expect(
      Either.isLeft(decode({ ...catalogRows[0], countryCode: "IDN" }))
    ).toBe(true);
    expect(
      Either.isLeft(decode({ ...catalogRows[1], invented: "value" }))
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(TryoutPlacementSourceSchema)({
          ...placement,
          choices: [],
        })
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(TryoutPlacementSourceSchema)({
          ...placement,
          answerContentKey:
            "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-2/answer",
        })
      )
    ).toBe(true);
    const incoherent = {
      ...placement,
      questionContentKey:
        "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/prompt",
    };
    expect(
      formatFailure(
        Schema.decodeUnknownEither(TryoutPlacementSourceSchema)(incoherent)
      )
    ).toContain(
      "Placement source, content keys, and authored order must agree."
    );
    expect(
      formatFailure(
        Schema.decodeUnknownEither(TryoutPlacementSchema)({
          ...incoherent,
          answerArtifactHash: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
          questionArtifactHash: Sha256HashSchema.make(
            `sha256:${"b".repeat(64)}`
          ),
          title: "Test",
        })
      )
    ).toContain(
      "Placement source, content keys, and authored order must agree."
    );
  });
});
