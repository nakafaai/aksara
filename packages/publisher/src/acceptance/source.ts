import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import {
  ACTIVE_APP_LOCALES,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
import { readQuestionSets } from "@nakafa/aksara-corpus/question-bank/source";
import type { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import {
  examSetPaths,
  planTryoutPapers,
} from "@nakafa/aksara-corpus/tryout/projection";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import {
  Array as Arr,
  Effect,
  HashSet,
  MutableList,
  Option,
  Order,
  Schema,
} from "effect";

// The Nakafa home page's lesson window reads parabolic-movement, atom-shell,
// bacteria and trigonometric-comparison-three-primary in every locale, so the
// acceptance release must hold them.
const materialKeys = [
  "material/lesson/biology/biodiversity/bacteria",
  "material/lesson/chemistry/structure-matter/atom-shell",
  "material/lesson/mathematics/analytic-geometry/hyperbola",
  "material/lesson/mathematics/exponential-logarithm/exponential-growth",
  "material/lesson/mathematics/function-composition-inverse-function/function-concept",
  "material/lesson/mathematics/linear-equation-inequality/system-linear-equation",
  "material/lesson/mathematics/trigonometry/right-triangle-naming",
  "material/lesson/mathematics/trigonometry/trigonometric-comparison-three-primary",
  "material/lesson/mathematics/trigonometry/trigonometry-concept",
  "material/lesson/physics/kinematics/parabolic-movement",
];
const articleKeys = [
  "articles/politics/merah-putih-cabinet-analysis",
  "articles/politics/regional-elections-turmoil",
];

/** The pinned acceptance corpus no longer contains a required reviewed source. */
export class AcceptanceSourceError extends Schema.TaggedError<
  AcceptanceSourceError,
  { readonly brand: unique symbol }
>()("AcceptanceSourceError", { identity: Schema.String }) {}

/** Requires every selected identity in every active locale before compiling. */
const selectEntries = Effect.fn("AksaraPublisher.selectAcceptanceEntries")(
  function* <
    Entry extends {
      readonly route: Pick<ContentHead, "contentKey" | "artifactLocale">;
    },
  >(entries: readonly Entry[], keys: readonly string[]) {
    const selected = MutableList.make<Entry>();
    for (const key of keys) {
      for (const locale of ACTIVE_APP_LOCALES) {
        const artifactLocale = ArtifactLocaleSchema.make(locale);
        const entry = Arr.findFirst(
          entries,
          ({ route }) =>
            route.contentKey === key && route.artifactLocale === artifactLocale
        );
        if (Option.isNone(entry)) {
          return yield* new AcceptanceSourceError({
            identity: `${key}:${locale}`,
          });
        }
        MutableList.append(selected, entry.value);
      }
    }
    return Arr.sortWith(
      MutableList.toArray(selected),
      ({ route }) => route,
      Order.make(compareContentHeads)
    );
  }
);

/** The try-out content of an acceptance release: the first set of every track. */
type AcceptanceTryout = Effect.Success<ReturnType<typeof loadTryoutContent>>;
type AcceptanceTryoutError =
  | AcceptanceSourceError
  | Effect.Error<ReturnType<typeof decodeTryoutRegistry>>
  | Effect.Error<ReturnType<typeof readQuestionSets>>
  | Effect.Error<ReturnType<typeof planTryoutPapers>>;
type AcceptanceSourceServices = Effect.Services<
  ReturnType<typeof readQuestionSets>
>;

/**
 * Loads the first set of every track with its paper plan, reading only the
 * question-bank sets those papers sit.
 */
export const loadAcceptanceTryout: (
  checkoutRoot: string
) => Effect.Effect<
  AcceptanceTryout,
  AcceptanceTryoutError,
  AcceptanceSourceServices
> = Effect.fn("AksaraPublisher.loadAcceptanceTryout")(function* (
  checkoutRoot: string
) {
  const registry = yield* decodeTryoutRegistry();
  const exams = yield* Effect.forEach(registry, (source) =>
    Effect.gen(function* () {
      const tracks = yield* Effect.forEach(source.tracks, (track) =>
        Effect.gen(function* () {
          const set = Arr.findFirst(track.sets, ({ key }) => key === "set-1");
          if (Option.isNone(set)) {
            return yield* new AcceptanceSourceError({
              identity: `${source.examKey}:${track.key}:set-1`,
            });
          }
          return { ...track, sets: [set.value] };
        })
      );
      return { ...source, tracks };
    })
  );
  const sets = yield* readQuestionSets(checkoutRoot, examSetPaths(exams));
  const papers = yield* planTryoutPapers(exams, sets);
  return { exams, papers, sets };
});

/** Resolves the finite acceptance selection from the pinned authored checkout. */
export interface AcceptanceSources {
  readonly article: Effect.Success<ReturnType<typeof decodeArticleRegistry>>;
  readonly material: Effect.Success<ReturnType<typeof decodeMaterialRegistry>>;
  readonly page: Effect.Success<ReturnType<typeof decodePageRegistry>>;
  readonly tryout: AcceptanceTryout;
}

export type AcceptanceSourceFailure =
  | AcceptanceTryoutError
  | Effect.Error<ReturnType<typeof decodeArticleRegistry>>
  | Effect.Error<ReturnType<typeof decodeMaterialRegistry>>
  | Effect.Error<ReturnType<typeof decodePageRegistry>>;

/** Resolves the finite acceptance selection from the pinned authored checkout. */
export const loadAcceptanceSources: (
  checkoutRoot: string
) => Effect.Effect<
  AcceptanceSources,
  AcceptanceSourceFailure,
  AcceptanceSourceServices
> = Effect.fn("AksaraPublisher.loadAcceptanceSources")(function* (
  checkoutRoot: string
) {
  const article = yield* selectEntries(
    yield* decodeArticleRegistry(),
    articleKeys
  );
  const materialRegistry = yield* decodeMaterialRegistry();
  const required = yield* selectEntries(materialRegistry, materialKeys);
  const materialGroups = HashSet.fromIterable(
    Arr.map(required, ({ route }) => route.materialKey)
  );
  const material = Arr.filter(materialRegistry, ({ route }) =>
    HashSet.has(materialGroups, route.materialKey)
  );
  const page = yield* decodePageRegistry();
  const tryout = yield* loadAcceptanceTryout(checkoutRoot);
  return { article, material, page, tryout };
});
