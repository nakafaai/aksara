import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import { ContentProjectionSchema } from "#contracts/projection/spec";
import { testPreviewTarget } from "#contracts/test/preview";
import { TryoutKeySchema } from "#contracts/tryout/key";
import {
  TryoutCatalogRowSchema,
  TryoutChoiceSchema,
  TryoutPlacementSchema,
  TryoutPlacementSourceSchema,
} from "#contracts/tryout/spec";

const catalogRows = [
  {
    countryCode: "ID",
    countryKey: testPreviewTarget.exam.countryKey,
    graph: testPreviewTarget.exam.graph,
    kind: "country",
    locale: testPreviewTarget.exam.locale,
    order: 1,
    publicPath: "try-out/indonesia",
    sourceRevision: testPreviewTarget.exam.sourceRevision,
    title: "Indonesia",
  },
  testPreviewTarget.exam,
  testPreviewTarget.track,
  testPreviewTarget.set,
  testPreviewTarget.section,
] as const;
const placement = Schema.decodeUnknownSync(TryoutPlacementSourceSchema)({
  ...testPreviewTarget.placement,
  choices: [
    {
      isCorrect: true,
      label: "Test choice",
      optionKey: "option-1",
      order: 1,
    },
  ],
});
/** Formats one expected strict schema failure for message assertions. */
function formatFailure(result: Either.Either<unknown, ParseResult.ParseError>) {
  if (Either.isRight(result)) {
    throw new Error("Expected schema decoding to fail.");
  }
  return ParseResult.TreeFormatter.formatErrorSync(result.left);
}
describe("try-out contracts", () => {
  it("decodes every hierarchy row", () => {
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
  });
  it("rejects malformed keys, country codes, and option identities", () => {
    expect(
      formatFailure(Schema.decodeUnknownEither(TryoutKeySchema)("Not-Kebab"))
    ).toContain("Invalid try-out key.");
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
    for (const contradiction of [
      { ...placement, countryKey: "germany" },
      { ...placement, examKey: "abitur" },
      { ...placement, sectionKey: "other-section" },
      { ...placement, setKey: "other-set" },
      {
        ...placement,
        questionSourcePath:
          "packages/corpus/question-bank/tryout/germany/abitur/quantitative-knowledge/set-1/question-1",
      },
      {
        ...placement,
        questionContentKey:
          "question-bank/tryout/indonesia/snbt/set-1/question-1/question",
      },
    ]) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(TryoutPlacementSourceSchema)(contradiction)
        )
      ).toBe(true);
    }
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
