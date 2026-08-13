import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  previewTryoutRoute,
  TryoutPreviewTargetSchema,
} from "#contracts/preview/target";
import { testPreviewTarget } from "#contracts/test/preview";

/** Reports whether strict target decoding rejects one candidate. */
function rejectsTarget(candidate: unknown) {
  return Either.isLeft(
    Schema.decodeUnknownEither(TryoutPreviewTargetSchema, {
      onExcessProperty: "error",
    })(candidate)
  );
}

describe("try-out preview target", () => {
  it("decodes one exact visible target and derives its section route", () => {
    expect(
      Schema.decodeUnknownSync(TryoutPreviewTargetSchema)(testPreviewTarget)
    ).toEqual(testPreviewTarget);
    expect(previewTryoutRoute(testPreviewTarget)).toEqual({
      appLocale: "en",
      publicPath: "try-out/indonesia/snbt/2027/set-1/general-reasoning",
    });
  });

  it("derives the set route for one coherent internal-entry section", () => {
    const target = Schema.decodeUnknownSync(TryoutPreviewTargetSchema)({
      ...testPreviewTarget,
      section: {
        ...testPreviewTarget.section,
        publicPath: undefined,
        visibility: "internal-entry",
      },
      set: {
        ...testPreviewTarget.set,
        internalEntrySectionKey: testPreviewTarget.section.sectionKey,
        visibleSectionCount: 0,
      },
    });

    expect(previewTryoutRoute(target)).toEqual({
      appLocale: "en",
      publicPath: "try-out/indonesia/snbt/2027/set-1",
    });
  });

  it("rejects every mismatched hierarchy identity", () => {
    const invalidTargets = [
      {
        ...testPreviewTarget,
        placement: {
          ...testPreviewTarget.placement,
          countryKey: "other-country",
        },
      },
      {
        ...testPreviewTarget,
        section: { ...testPreviewTarget.section, examKey: "tka" },
      },
      {
        ...testPreviewTarget,
        set: { ...testPreviewTarget.set, appLocale: "id" },
      },
      {
        ...testPreviewTarget,
        track: {
          ...testPreviewTarget.track,
          sourceRevision: "other-revision",
        },
      },
      {
        ...testPreviewTarget,
        set: { ...testPreviewTarget.set, trackKey: "other-track" },
      },
      {
        ...testPreviewTarget,
        section: { ...testPreviewTarget.section, trackKey: "other-track" },
      },
      {
        ...testPreviewTarget,
        placement: {
          ...testPreviewTarget.placement,
          trackKey: "other-track",
        },
      },
      {
        ...testPreviewTarget,
        section: { ...testPreviewTarget.section, setKey: "set-2" },
      },
      {
        ...testPreviewTarget,
        placement: { ...testPreviewTarget.placement, setKey: "set-2" },
      },
      {
        ...testPreviewTarget,
        placement: {
          ...testPreviewTarget.placement,
          sectionKey: "other-section",
        },
      },
    ];

    expect(invalidTargets.every(rejectsTarget)).toBe(true);
    expect(
      String(
        Schema.decodeUnknownEither(TryoutPreviewTargetSchema)(invalidTargets[0])
      )
    ).toContain(
      "Expected preview target hierarchy keys, locale, and revision to agree."
    );
  });

  it("rejects unrelated nested and internal-entry routes", () => {
    const invalidTargets = [
      {
        ...testPreviewTarget,
        track: {
          ...testPreviewTarget.track,
          publicPath: "try-out/other/track",
        },
      },
      {
        ...testPreviewTarget,
        set: {
          ...testPreviewTarget.set,
          publicPath: "try-out/other/set",
        },
      },
      {
        ...testPreviewTarget,
        section: {
          ...testPreviewTarget.section,
          publicPath: "try-out/other/section",
        },
      },
      {
        ...testPreviewTarget,
        section: {
          ...testPreviewTarget.section,
          publicPath: undefined,
          visibility: "internal-entry",
        },
        set: {
          ...testPreviewTarget.set,
          internalEntrySectionKey: "other-section",
          visibleSectionCount: 0,
        },
      },
      {
        ...testPreviewTarget,
        set: {
          ...testPreviewTarget.set,
          internalEntrySectionKey: testPreviewTarget.section.sectionKey,
          visibleSectionCount: 0,
        },
      },
    ];

    expect(invalidTargets.every(rejectsTarget)).toBe(true);
    expect(
      String(
        Schema.decodeUnknownEither(TryoutPreviewTargetSchema)(invalidTargets[0])
      )
    ).toContain(
      "Expected preview target routes to form one reachable hierarchy."
    );
  });

  it("rejects placements outside the selected section source", () => {
    const invalidTargets = [
      {
        ...testPreviewTarget,
        placement: {
          ...testPreviewTarget.placement,
          answerContentKey:
            "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-21/answer",
          questionContentKey:
            "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-21/question",
          questionOrder: 21,
          questionSourcePath:
            "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-21",
        },
      },
      {
        ...testPreviewTarget,
        placement: {
          ...testPreviewTarget.placement,
          questionSourcePath:
            "packages/corpus/question-bank/tryout/indonesia/tka/mathematics/set-1/question-1",
        },
      },
    ];

    expect(invalidTargets.every(rejectsTarget)).toBe(true);
    expect(
      String(
        Schema.decodeUnknownEither(TryoutPreviewTargetSchema)(invalidTargets[1])
      )
    ).toContain(
      "Expected preview placement to belong to the selected section source."
    );
  });

  it("rejects a redundant target route field under strict decoding", () => {
    expect(
      rejectsTarget({
        ...testPreviewTarget,
        publicPath: testPreviewTarget.section.publicPath,
      })
    ).toBe(true);
  });

  it("rejects canonical question choices duplicated into the preview target", () => {
    expect(
      rejectsTarget({
        ...testPreviewTarget,
        placement: {
          ...testPreviewTarget.placement,
          choices: [
            {
              isCorrect: true,
              label: "Test correct choice",
              optionKey: "option-1",
              order: 1,
            },
            {
              isCorrect: false,
              label: "Test incorrect choice",
              optionKey: "option-2",
              order: 2,
            },
          ],
        },
      })
    ).toBe(true);
  });
});
