import { NodeServices } from "@effect/platform-node";
import { beforeEach, expect, layer } from "@effect/vitest";
import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
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
const firstSetSuffix = /:set-1$/u;
// Lessons the Nakafa home page reads in every locale, so the release must hold them.
const homeLessonKeys = [
  "material/lesson/physics/kinematics/parabolic-movement",
  "material/lesson/chemistry/structure-matter/atom-shell",
  "material/lesson/biology/biodiversity/bacteria",
  "material/lesson/mathematics/trigonometry/trigonometric-comparison-three-primary",
];
const homeLessonIdentities = Arr.flatMap(homeLessonKeys, (key) =>
  Arr.map(ACTIVE_APP_LOCALES, (locale) => `${key}:${locale}`)
);
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
    "keeps complete material groups, pages, and the first set of every track",
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
          "lesson.biology.biodiversity",
          "lesson.chemistry.structure-matter",
          "lesson.mathematics.analytic-geometry",
          "lesson.mathematics.exponential-logarithm",
          "lesson.mathematics.function-composition-inverse-function",
          "lesson.mathematics.linear-equation-inequality",
          "lesson.mathematics.trigonometry",
          "lesson.physics.kinematics",
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
        const tracks = Arr.flatMap(registry, (exam) =>
          Arr.map(exam.tracks, (track) => ({ exam, track }))
        );
        expect(Arr.map(tryout.papers, ({ id }) => id)).toEqual(
          Arr.map(
            tracks,
            ({ exam, track }) =>
              `${exam.countryKey}/${exam.examKey}/${track.key}/set-1`
          )
        );
        expect(Arr.map(tryout.sets, ({ path }) => path)).toEqual(
          Arr.flatMap(tracks, ({ exam, track }) =>
            Arr.map(
              track.profile.sections,
              ({ key }) => `${exam.countryKey}/${exam.examKey}/${key}/set-1`
            )
          )
        );
        expect(
          Arr.flatMap(tryout.sets, ({ questions }) => questions)
        ).toHaveLength(
          Arr.reduce(tracks, 0, (total, { track }) =>
            Arr.reduce(
              track.profile.sections,
              total,
              (sum, { items }) => sum + items
            )
          )
        );
        expect(
          Arr.flatMap(tryout.exams, ({ tracks: kept }) =>
            Arr.flatMap(kept, ({ sets }) => Arr.map(sets, ({ key }) => key))
          )
        ).toEqual(Arr.map(tracks, () => "set-1"));
      })
  );

  it.effect(
    "keeps every locale of the lessons the Nakafa home page reads",
    () =>
      Effect.gen(function* () {
        const selected = yield* loadAcceptanceSources(yield* checkoutRoot);
        const identities = Arr.map(
          selected.material,
          ({ route }) => `${route.contentKey}:${route.artifactLocale}`
        );
        for (const identity of homeLessonIdentities) {
          expect(identities).toContain(identity);
        }
      })
  );

  it.effect.each([
    "articles/politics/merah-putih-cabinet-analysis:en",
    "articles/politics/regional-elections-turmoil:id",
    "material/lesson/mathematics/analytic-geometry/hyperbola:de",
    "material/lesson/mathematics/exponential-logarithm/exponential-growth:id",
    ...homeLessonIdentities,
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
      expect(error._tag).toBe("QuestionReadError");
    })
  );
});
