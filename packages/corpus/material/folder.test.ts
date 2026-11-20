import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Path } from "effect";

import { discoverMaterialSources } from "#corpus/material/folder";
import { CHECKOUT_ROOT } from "#corpus/test/root";

/** One real lesson with one section, which the fixtures copy and change. */
const REAL_LESSON = "packages/corpus/material/lesson/biology/cell-organisation";
const REAL_SECTION = "cell-structure";

/** How a fixture changes the copied lesson before discovery reads it. */
interface FixtureChange {
  /** An extra folder created inside the lesson folder. */
  readonly extraFolder?: string;
  /** The lesson folder, below the lesson root, that receives the copy. */
  readonly folder?: string;
  /** Rewrites the lesson module, or removes it when this returns undefined. */
  readonly lesson?: (text: string) => string | undefined;
  /** Rewrites the section module, or removes it when this returns undefined. */
  readonly section?: (text: string) => string | undefined;
}

/**
 * Builds a checkout in a scoped temporary folder whose only lesson is a copy of
 * the real cell organisation lesson, changed as `change` says.
 */
const fixtureCheckout = Effect.fn("AksaraCorpus.test.fixtureCheckout")(
  function* (change: FixtureChange) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-lessons-",
    });
    const lesson = path.join(
      root,
      "packages/corpus/material/lesson",
      change.folder ?? "biology/cell-organisation"
    );
    const section = path.join(lesson, REAL_SECTION);
    yield* fileSystem.makeDirectory(section, { recursive: true });
    if (change.extraFolder !== undefined) {
      yield* fileSystem.makeDirectory(path.join(lesson, change.extraFolder));
    }
    for (const [file, target, edit] of [
      ["source.ts", lesson, change.lesson],
      [`${REAL_SECTION}/section.ts`, section, change.section],
    ] as const) {
      const text = yield* fileSystem.readFileString(
        path.join(CHECKOUT_ROOT, REAL_LESSON, file)
      );
      const edited = edit === undefined ? text : edit(text);
      if (edited !== undefined) {
        yield* fileSystem.writeFileString(
          path.join(target, path.basename(file)),
          edited
        );
      }
    }
    return root;
  }
);

/** Discovers the fixture's lessons and returns the typed refusal. */
const refusal = (change: FixtureChange) =>
  Effect.gen(function* () {
    const root = yield* fixtureCheckout(change);
    return yield* discoverMaterialSources(root).pipe(Effect.flip);
  }).pipe(Effect.scoped);

layer(NodeServices.layer)("lesson folder discovery", (it) => {
  it.effect(
    "composes a lesson from its lesson module and its section modules",
    () =>
      Effect.gen(function* () {
        const root = yield* fixtureCheckout({});

        const sources = yield* discoverMaterialSources(root);

        expect(Arr.map(sources, ({ key }) => key)).toEqual([
          "lesson.biology.cell-organisation",
        ]);
        expect(sources[0]?.sections[0]).toMatchObject({ slug: REAL_SECTION });
      }).pipe(Effect.scoped)
  );

  it.effect.each([
    { change: { lesson: () => undefined }, folder: "", reason: "missing" },
    {
      change: { lesson: () => "const lesson = {" },
      folder: "",
      reason: "invalid",
    },
    {
      change: {
        lesson: (text: string) =>
          text.replace('kind: "lesson",', 'kind: "lesson",\n  extra: 1,'),
      },
      folder: "",
      reason: "invalid",
    },
    {
      change: { folder: "biology/cell-structure" },
      folder: "",
      reason: "misplaced",
    },
    { change: { extraFolder: "unlisted" }, folder: "", reason: "sections" },
    {
      change: { section: () => undefined },
      folder: `/${REAL_SECTION}`,
      reason: "missing",
    },
  ] as const)(
    "refuses a lesson whose folder is $reason",
    ({ change, folder, reason }) =>
      Effect.gen(function* () {
        const lesson = change.folder ?? "biology/cell-organisation";

        expect(yield* refusal(change)).toMatchObject({
          _tag: "MaterialFolderError",
          folder: `packages/corpus/material/lesson/${lesson}${folder}`,
          reason,
        });
      })
  );

  it.effect("refuses a lesson root holding an entry it cannot inspect", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fixtureCheckout({});
      yield* fileSystem.symlink(
        path.join(root, "absent"),
        path.join(root, "packages/corpus/material/lesson/ghost")
      );

      expect(
        yield* discoverMaterialSources(root).pipe(Effect.flip)
      ).toMatchObject({
        _tag: "MaterialFolderError",
        folder: "packages/corpus/material/lesson",
        reason: "unreadable",
      });
    }).pipe(Effect.scoped)
  );

  it.effect("refuses a checkout without a lesson root", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped();

      expect(
        yield* discoverMaterialSources(root).pipe(Effect.flip)
      ).toMatchObject({
        _tag: "MaterialFolderError",
        folder: "packages/corpus/material/lesson",
        reason: "unreadable",
      });
    }).pipe(Effect.scoped)
  );
});
