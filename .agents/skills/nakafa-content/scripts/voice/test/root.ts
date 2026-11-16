import { Effect, FileSystem, Path } from "effect";

/** Creates a temporary lesson root that the test's scope removes. */
export const temporaryRoot = Effect.fn("LessonVoiceTest.temporaryRoot")(
  function* (entries: Record<string, string>) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* fileSystem
      .makeTempDirectoryScoped({ prefix: "nakafa-lesson-voice-" })
      .pipe(Effect.orDie);
    for (const [entry, source] of Object.entries(entries)) {
      const file = path.join(root, entry);
      yield* fileSystem
        .makeDirectory(path.dirname(file), { recursive: true })
        .pipe(Effect.orDie);
      yield* fileSystem.writeFileString(file, source).pipe(Effect.orDie);
    }
    return root;
  }
);
