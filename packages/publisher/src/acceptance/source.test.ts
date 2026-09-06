import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { beforeEach, expect, layer } from "@effect/vitest";
import {
  compareContentHeads,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { questionArtifactLocalesForPolicy } from "@nakafa/aksara-contracts/tryout/language";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
import { QuestionReadError } from "@nakafa/aksara-corpus/question-bank/source";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import { Effect } from "effect";
import {
  AcceptanceSourceError,
  loadAcceptanceSources,
  loadAcceptanceTryout,
} from "#publisher/acceptance/source";

const checkoutRoot = resolve(process.cwd(), "..", "..");
const firstSetSuffix = /:set-1$/;
const state = vi.hoisted(() => ({ missing: "" }));

vi.mock("@nakafa/aksara-corpus/articles/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/articles/registry")
    >();
  return {
    ...original,
    decodeArticleRegistry: () =>
      original
        .decodeArticleRegistry()
        .pipe(
          Effect.map((entries) =>
            entries.filter(
              ({ route }) =>
                `${route.contentKey}:${route.artifactLocale}` !== state.missing
            )
          )
        ),
  };
});
vi.mock("@nakafa/aksara-corpus/material/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/material/registry")
    >();
  return {
    ...original,
    decodeMaterialRegistry: () =>
      original
        .decodeMaterialRegistry()
        .pipe(
          Effect.map((entries) =>
            entries.filter(
              ({ route }) =>
                `${route.contentKey}:${route.artifactLocale}` !== state.missing
            )
          )
        ),
  };
});
vi.mock("@nakafa/aksara-corpus/tryout/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/tryout/registry")
    >();
  return {
    ...original,
    decodeTryoutRegistry: () =>
      original.decodeTryoutRegistry().pipe(
        Effect.map((entries) =>
          state.missing === "set-1"
            ? entries.map((entry) => ({
                ...entry,
                tracks: entry.tracks.map((track) => ({
                  ...track,
                  sets: track.sets.filter(({ key }) => key !== "set-1"),
                })),
              }))
            : entries
        )
      ),
  };
});

beforeEach(() => {
  state.missing = "";
});

layer(NodeServices.layer)("acceptance source selection", (it) => {
  it.effect(
    "keeps complete selected material groups and every page locale",
    () =>
      Effect.gen(function* () {
        const selected = yield* loadAcceptanceSources(checkoutRoot);
        const materials = yield* decodeMaterialRegistry();
        const articles = yield* decodeArticleRegistry();
        const pages = yield* decodePageRegistry();
        const groups = new Set(
          selected.material.map(({ route }) => route.materialKey)
        );
        expect([...groups].sort()).toEqual([
          "lesson.mathematics.analytic-geometry",
          "lesson.mathematics.function-composition-inverse-function",
          "lesson.mathematics.linear-equation-inequality",
          "lesson.mathematics.trigonometry",
        ]);
        expect(selected.material).toEqual(
          materials.filter(({ route }) => groups.has(route.materialKey))
        );
        expect(selected.material.length).toBeGreaterThan(
          5 * ACTIVE_APP_LOCALES.length
        );
        expect(selected.article).toEqual(
          articles
            .filter(
              ({ route }) =>
                route.contentKey ===
                "articles/politics/regional-elections-turmoil"
            )
            .sort((left, right) => compareContentHeads(left.route, right.route))
        );
        expect(selected.page).toEqual(pages);
        for (const entry of selected.article) {
          expect(ACTIVE_APP_LOCALES).toContain(entry.route.artifactLocale);
        }
        expect(selected.article).toHaveLength(ACTIVE_APP_LOCALES.length);
      })
  );

  it.effect(
    "retains all questions in set 1 for every track and each required body locale",
    () =>
      Effect.gen(function* () {
        const registry = yield* decodeTryoutRegistry();
        const selected = yield* loadAcceptanceTryout(checkoutRoot);
        const expectedRoots = registry.flatMap(({ tracks }) =>
          tracks.flatMap(({ sets }) =>
            sets
              .filter(({ key }) => key === "set-1")
              .flatMap(({ sections }) =>
                sections.flatMap((section) =>
                  Array.from(
                    { length: section.questionCount },
                    (_, index) =>
                      `${section.questionSourcePath}/question-${index + 1}`
                  )
                )
              )
          )
        );
        expect(
          selected.sources.map(({ questionKey }) => questionKey).sort()
        ).toEqual([...new Set(expectedRoots)].sort());
        expect(selected.entries).toEqual(
          [...selected.entries].sort(compareContentHeads)
        );
        expect(new Set(selected.entries.map(headIdentity)).size).toBe(
          selected.entries.length
        );
        for (const source of selected.sources) {
          const entries = selected.entries.filter(
            ({ questionKey }) => questionKey === source.questionKey
          );
          expect(
            entries
              .filter(({ bodyKind }) => bodyKind === "answer")
              .map(({ artifactLocale }) => artifactLocale)
              .sort()
          ).toEqual([...ACTIVE_APP_LOCALES].sort());
          expect(
            entries
              .filter(({ bodyKind }) => bodyKind === "question")
              .map(({ artifactLocale }) => artifactLocale)
              .sort()
          ).toEqual(
            [...questionArtifactLocalesForPolicy(source.languagePolicy)].sort()
          );
        }
        expect(selected.projection.placements).toHaveLength(
          expectedRoots.length * ACTIVE_APP_LOCALES.length
        );
        const catalogTracks = selected.projection.catalog.filter(
          ({ row }) => row.kind === "track"
        );
        const catalogSets = selected.projection.catalog.filter(
          ({ row }) => row.kind === "set"
        );
        expect(catalogSets).toHaveLength(catalogTracks.length);
      })
  );

  it.effect.each([
    "articles/politics/regional-elections-turmoil:id",
    "material/lesson/mathematics/analytic-geometry/hyperbola:de",
  ])(
    "rejects a required authored locale instead of shrinking the sample: %s",
    (identity) =>
      Effect.gen(function* () {
        state.missing = identity;
        const error = yield* loadAcceptanceSources(checkoutRoot).pipe(
          Effect.flip
        );
        expect(error).toBeInstanceOf(AcceptanceSourceError);
        expect(error).toMatchObject({ identity });
      })
  );

  it.effect("rejects a track without its complete first set", () =>
    Effect.gen(function* () {
      state.missing = "set-1";
      const error = yield* loadAcceptanceTryout(checkoutRoot).pipe(Effect.flip);
      expect(error).toBeInstanceOf(AcceptanceSourceError);
      expect(error).toMatchObject({
        identity: expect.stringMatching(firstSetSuffix),
      });
    })
  );

  it.effect("preserves a typed source read failure before projection", () =>
    Effect.gen(function* () {
      const error = yield* loadAcceptanceTryout(
        "/test/missing-acceptance-checkout"
      ).pipe(Effect.flip);
      expect(error).toBeInstanceOf(QuestionReadError);
    })
  );
});
