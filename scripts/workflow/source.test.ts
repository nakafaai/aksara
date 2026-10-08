import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem } from "effect";
import { readSource } from "#scripts/workflow/source";

describe("workflow source text", () => {
  it.effect("keeps a leading byte order mark in the text it reads", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped();
      const path = `${root}/manifest.json`;
      const text = '\u{FEFF}{"name":"@nakafa/aksara-utilities"}\n';
      yield* fileSystem.writeFileString(path, text);
      expect(yield* readSource(path)).toBe(text);
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
