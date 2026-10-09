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
import { Array as Arr, Effect, HashSet, Order, Path } from "effect";
import {
  AcceptanceSourceError,
  loadAcceptanceSources,
  loadAcceptanceTryout,
} from "#publisher/acceptance/source";

const checkoutRoot = Effect.map(Path.Path, (path) =>
  path.resolve(process.cwd(), "..", "..")
);
const firstSetSuffix = /:set-1$/;
const state = vi.hoisted(() => ({ missing: "" }));
type ArticleEntry = Effect.Success<
  ReturnType<typeof decodeArticleRegistry>
>[number];

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
            Arr.filter(
              entries,
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
            Arr.filter(
              entries,
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
            ? Arr.map(entries, (entry) => ({
                ...entry,
                tracks: Arr.map(entry.tracks, (track) => ({
                  ...track,
                  sets: Arr.filter(track.sets, ({ key }) => key !== "set-1"),
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
    "keeps complete material groups, pages, and every first-set question locale",
    () =>
      Effect.gen(function* () {
        const selected = yield* loadAcceptanceSources(yield* checkoutRoot);
        const materials = yield* decodeMaterialRegistry();
        const articles = yield* decodeArticleRegistry();
        const pages = yield* decodePageRegistry();
        const groups = HashSet.fromIterable(
          Arr.map(selected.material, ({ route }) => route.materialKey)
        );
        expect(Arr.sort(groups, Order.String)).toEqual([
          "lesson.mathematics.analytic-geometry",
          "lesson.mathematics.exponential-logarithm",
          "lesson.mathematics.function-composition-inverse-function",
          "lesson.mathematics.linear-equation-inequality",
          "lesson.mathematics.trigonometry",
        ]);
        expect(selected.material).toEqual(
          Arr.filter(materials, ({ route }) =>
            HashSet.has(groups, route.materialKey)
          )
        );
        expect(selected.material.length).toBeGreaterThan(
          6 * ACTIVE_APP_LOCALES.length
        );
        expect(selected.article).toEqual(
          Arr.sort(
            Arr.filter(articles, ({ route }) =>
              Arr.contains(
                [
                  "articles/politics/merah-putih-cabinet-analysis",
                  "articles/politics/regional-elections-turmoil",
                ],
                route.contentKey
              )
            ),
            Order.make((left: ArticleEntry, right: ArticleEntry) =>
              compareContentHeads(left.route, right.route)
            )
          )
        );
        expect(selected.page).toEqual(pages);
        for (const entry of selected.article) {
          expect(ACTIVE_APP_LOCALES).toContain(entry.route.artifactLocale);
        }
        expect(selected.article).toHaveLength(2 * ACTIVE_APP_LOCALES.length);
        const registry = yield* decodeTryoutRegistry();
        const { tryout } = selected;
        const expectedRoots = Arr.flatMap(registry, ({ tracks }) =>
          Arr.flatMap(tracks, ({ sets }) =>
            Arr.flatMap(sets, (set) =>
              set.key === "set-1"
                ? Arr.flatMap(set.sections, (section) =>
                    Array.from(
                      { length: section.questionCount },
                      (_, index) =>
                        `${section.questionSourcePath}/question-${index + 1}`
                    )
                  )
                : []
            )
          )
        );
        expect(
          Arr.sort(
            Arr.map(tryout.sources, ({ questionKey }) => questionKey),
            Order.String
          )
        ).toEqual(Arr.sort(Arr.dedupe(expectedRoots), Order.String));
        expect(tryout.entries).toEqual(
          Arr.sort(tryout.entries, Order.make(compareContentHeads))
        );
        expect(
          HashSet.size(
            HashSet.fromIterable(Arr.map(tryout.entries, headIdentity))
          )
        ).toBe(tryout.entries.length);
        for (const source of tryout.sources) {
          const entries = Arr.filter(
            tryout.entries,
            ({ questionKey }) => questionKey === source.questionKey
          );
          expect(
            Arr.sort(
              Arr.map(
                Arr.filter(entries, ({ bodyKind }) => bodyKind === "answer"),
                ({ artifactLocale }) => artifactLocale
              ),
              Order.String
            )
          ).toEqual(Arr.sort(ACTIVE_APP_LOCALES, Order.String));
          expect(
            Arr.sort(
              Arr.map(
                Arr.filter(entries, ({ bodyKind }) => bodyKind === "question"),
                ({ artifactLocale }) => artifactLocale
              ),
              Order.String
            )
          ).toEqual(
            Arr.sort(
              questionArtifactLocalesForPolicy(source.languagePolicy),
              Order.String
            )
          );
        }
        expect(tryout.projection.placements).toHaveLength(
          expectedRoots.length * ACTIVE_APP_LOCALES.length
        );
        const catalogTracks = Arr.filter(
          tryout.projection.catalog,
          ({ row }) => row.kind === "track"
        );
        const catalogSets = Arr.filter(
          tryout.projection.catalog,
          ({ row }) => row.kind === "set"
        );
        expect(catalogSets).toHaveLength(catalogTracks.length);
      })
  );

  it.effect.each([
    "articles/politics/merah-putih-cabinet-analysis:en",
    "articles/politics/regional-elections-turmoil:id",
    "material/lesson/mathematics/analytic-geometry/hyperbola:de",
    "material/lesson/mathematics/exponential-logarithm/exponential-growth:id",
  ])(
    "rejects a required authored locale instead of shrinking the sample: %s",
    (identity) =>
      Effect.gen(function* () {
        state.missing = identity;
        const error = yield* loadAcceptanceSources(yield* checkoutRoot).pipe(
          Effect.flip
        );
        expect(error).toBeInstanceOf(AcceptanceSourceError);
        expect(error).toMatchObject({ identity });
      })
  );

  it.effect("rejects a track without its complete first set", () =>
    Effect.gen(function* () {
      state.missing = "set-1";
      const error = yield* loadAcceptanceTryout(yield* checkoutRoot).pipe(
        Effect.flip
      );
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
