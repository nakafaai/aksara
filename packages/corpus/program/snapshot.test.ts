import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";

import {
  prepareProgramSnapshot,
  streamProgramRows,
} from "#corpus/program/snapshot";

describe("program snapshot preparation", () => {
  it("prepares the exact six real rows with complete en/id slug evidence", async () => {
    const prepared = await Effect.runPromise(prepareProgramSnapshot());
    const rows = Chunk.toReadonlyArray(
      await Effect.runPromise(Stream.runCollect(prepared.rows()))
    );

    expect(prepared.manifest).toMatchObject({
      format: "program-v1",
      locales: ["en", "id"],
      rowCount: 6,
      slugCount: 12,
    });
    expect(
      rows.map(({ row }) => ({
        en: row.translations.en.publicSlug,
        id: row.translations.id.publicSlug,
        key: row.key,
      }))
    ).toEqual([
      { en: "merdeka", id: "merdeka", key: "merdeka" },
      {
        en: "cambridge-international",
        id: "cambridge-international",
        key: "cambridge-international",
      },
      {
        en: "singapore-moe",
        id: "singapore-moe",
        key: "singapore-moe",
      },
      {
        en: "united-states",
        id: "amerika-serikat",
        key: "united-states",
      },
      { en: "tka", id: "tka", key: "tka" },
      { en: "snbt", id: "snbt", key: "snbt" },
    ]);
  });

  it("replays reproducible rows and rejects malformed source input", async () => {
    const first = await Effect.runPromise(prepareProgramSnapshot());
    const second = await Effect.runPromise(prepareProgramSnapshot());
    const firstRows = await Effect.runPromise(
      Stream.runCollect(streamProgramRows())
    );
    const replayRows = await Effect.runPromise(Stream.runCollect(first.rows()));
    const error = await Effect.runPromise(
      prepareProgramSnapshot([{ invented: true }]).pipe(Effect.flip)
    );

    expect(second.manifest).toEqual(first.manifest);
    expect(replayRows).toEqual(firstRows);
    expect(error._tag).toBe("ProgramCatalogError");
  });
});
