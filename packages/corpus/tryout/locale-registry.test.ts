import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import { composeTryoutLocaleRegistry } from "#corpus/tryout/locale-registry";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

describe("try-out locale registry", () => {
  it("fails closed for an unsupported exam and missing section copy", async () => {
    const [source] = await Effect.runPromise(decodeTryoutRegistry());
    const [track] = source?.tracks ?? [];
    const [set] = track?.sets ?? [];
    const [section] = set?.sections ?? [];
    if (!(source && track && set && section)) {
      throw new Error("Expected one real try-out hierarchy.");
    }
    const unsupported = {
      ...source,
      examKey: TryoutKeySchema.make("abitur"),
    };
    const missingSection = {
      ...source,
      tracks: [
        {
          ...track,
          sets: [
            {
              ...set,
              sections: [
                ...set.sections,
                { ...section, key: TryoutKeySchema.make("missing-copy") },
              ],
            },
            ...track.sets.slice(1),
          ],
        },
        ...source.tracks.slice(1),
      ],
    };

    const [examError, sectionError] = await Effect.runPromise(
      Effect.all([
        composeTryoutLocaleRegistry([unsupported]).pipe(Effect.flip),
        composeTryoutLocaleRegistry([missingSection]).pipe(Effect.flip),
      ])
    );
    expect(examError).toMatchObject({ scope: "exam" });
    expect(sectionError).toMatchObject({
      key: "missing-copy",
      scope: "section",
    });
  });
});
