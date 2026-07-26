import { Path } from "@effect/platform";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { selectQuestionContent } from "#corpus/question-bank/content";
import { corpusRoot, makeQuestionLayer } from "#corpus/test/question-layer";
import { makeTryoutPlacement } from "#corpus/tryout/placement";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

const promptPath = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question.en.mdx"
);

/** Loads one real question and its exact source-owned placement context. */
async function loadPlacementFixture() {
  const sources = await Effect.runPromise(decodeTryoutRegistry());
  const content = await Effect.runPromise(
    selectQuestionContent(corpusRoot, sources, promptPath).pipe(
      Effect.provide([makeQuestionLayer(), Path.layer])
    )
  );
  const source = sources.find(({ examKey }) => examKey === "snbt");
  const track = source?.tracks.find(({ key }) => key === "2027");
  const set = track?.sets.find(({ key }) => key === "set-1");
  const section = set?.sections.find(
    ({ key }) => key === "reading-and-writing-skills"
  );
  if (
    source === undefined ||
    track === undefined ||
    set === undefined ||
    section === undefined
  ) {
    throw new Error("Expected the canonical SNBT placement hierarchy.");
  }
  return {
    context: { section, set, source, track },
    question: content.source,
  };
}

describe("tryout placement", () => {
  it("builds the canonical placement from one owned hierarchy", async () => {
    const fixture = await loadPlacementFixture();
    const placement = await Effect.runPromise(
      makeTryoutPlacement(fixture.context, fixture.question, "en")
    );

    expect(placement).toMatchObject({
      questionOrder: 1,
      sectionKey: "reading-and-writing-skills",
      setKey: "set-1",
      trackKey: "2027",
    });
  });

  it("rejects an unrelated hierarchy and out-of-range order", async () => {
    const fixture = await loadPlacementFixture();
    const detachedContext = {
      ...fixture.context,
      section: { ...fixture.context.section },
    };
    const outOfRange = {
      ...fixture.question,
      questionNumber: fixture.context.section.questionCount + 1,
    };
    const [owner, order] = await Effect.runPromise(
      Effect.all([
        makeTryoutPlacement(detachedContext, fixture.question, "en").pipe(
          Effect.flip
        ),
        makeTryoutPlacement(fixture.context, outOfRange, "en").pipe(
          Effect.flip
        ),
      ])
    );

    expect(owner).toMatchObject({ reason: "owner" });
    expect(order).toMatchObject({ reason: "order" });
  });
});
