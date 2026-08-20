import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { HistoricalTryoutRowSchema } from "#contracts/history/tryout-row";
import {
  historicalCatalogRows,
  historicalInternalSection,
  historicalInternalSet,
  historicalPlacement,
} from "#contracts/test/history-row";

const rowHash =
  "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

/** Wraps one unknown row in the exact retained catalog envelope. */
function catalogEnvelope(row: unknown) {
  return { family: "tryout", record: { row, rowHash }, rowKind: "catalog" };
}

/** Wraps one unknown row in the exact retained placement envelope. */
function placementEnvelope(row: unknown) {
  return { family: "tryout", record: { row, rowHash }, rowKind: "placement" };
}

/** Strictly decodes one retained row envelope for contract assertions. */
function decode(input: unknown) {
  return Schema.decodeUnknownExit(HistoricalTryoutRowSchema)(input, {
    onExcessProperty: "error",
  });
}

/** Requires one unknown retained row to fail with an exact contract reason. */
function expectRejected(input: unknown, message: string) {
  const result = decode(input);
  expect(Exit.isFailure(result)).toBe(true);
  expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(message);
}

describe("historical try-out rows", () => {
  it("accepts every exact retained catalog row shape", () => {
    const rows = [
      ...historicalCatalogRows,
      historicalInternalSet,
      historicalInternalSection,
    ];

    expect(
      rows.map((row) => Exit.isSuccess(decode(catalogEnvelope(row))))
    ).toEqual(rows.map(() => true));
  });

  it("rejects incoherent retained track counts", () => {
    const track = historicalCatalogRows.find(({ kind }) => kind === "track");
    expect(track).toBeDefined();
    expectRejected(
      catalogEnvelope({ ...track, sectionCount: 1, visibleSectionCount: 2 }),
      "visible sections exceed"
    );
  });

  it("rejects both incoherent retained set modes", () => {
    const visibleSet = historicalCatalogRows.find(({ kind }) => kind === "set");
    expect(visibleSet).toBeDefined();
    expectRejected(
      catalogEnvelope({ ...visibleSet, visibleSectionCount: 1 }),
      "set section counts are incoherent"
    );
    expectRejected(
      catalogEnvelope({ ...historicalInternalSet, sectionCount: 2 }),
      "set section counts are incoherent"
    );
    expectRejected(
      catalogEnvelope({ ...historicalInternalSet, visibleSectionCount: 1 }),
      "set section counts are incoherent"
    );
  });

  it("rejects both incoherent retained section route modes", () => {
    const visibleSection = historicalCatalogRows.find(
      ({ kind }) => kind === "section"
    );
    expect(visibleSection).toBeDefined();
    const { publicPath: _publicPath, ...withoutPublicPath } =
      visibleSection ?? {};
    expectRejected(
      catalogEnvelope(withoutPublicPath),
      "section visibility and public path disagree"
    );
    expectRejected(
      catalogEnvelope({
        ...historicalInternalSection,
        publicPath: "try-out/indonesia/snbt/2027/set-entry/entry",
      }),
      "section visibility and public path disagree"
    );
  });

  it("rejects incoherent retained choices", () => {
    expectRejected(
      placementEnvelope({
        ...historicalPlacement,
        choices: historicalPlacement.choices.map((choice) => ({
          ...choice,
          isCorrect: false,
        })),
      }),
      "choices have incoherent option identities"
    );
    expectRejected(
      placementEnvelope({
        ...historicalPlacement,
        choices: [
          historicalPlacement.choices[0],
          { ...historicalPlacement.choices[1], order: 3 },
        ],
      }),
      "choices have incoherent option identities"
    );
    expectRejected(
      placementEnvelope({
        ...historicalPlacement,
        choices: [
          historicalPlacement.choices[0],
          { ...historicalPlacement.choices[1], optionKey: "option-3" },
        ],
      }),
      "choices have incoherent option identities"
    );
  });

  it.each([
    ["questionContentKey", "question-bank/tryout/not-a-question"],
    [
      "questionContentKey",
      "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/not-a-question/question",
    ],
    ["answerContentKey", "question-bank/tryout/wrong/answer"],
    ["countryKey", "germany"],
    ["examKey", "other-exam"],
    ["sectionKey", "other-section"],
    ["setKey", "set-2"],
    ["questionOrder", 2],
    ["questionSourcePath", "packages/corpus/question-bank/tryout/wrong/path"],
  ])("rejects incoherent placement field %s", (field, value) => {
    expectRejected(
      placementEnvelope({ ...historicalPlacement, [field]: value }),
      "placement identities are incoherent"
    );
  });
});
