import { ContentHeadSchema } from "@nakafa/aksara-contracts/release/head";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import {
  Effect,
  type FileSystem,
  type Path,
  Schema,
  type Scope,
  Stream,
} from "effect";
import {
  type AcceptanceSourceFailure,
  type AcceptanceSources,
  loadAcceptanceSources,
} from "#publisher/acceptance/source";
import { planArticlePublication } from "#publisher/article/plan";
import type { ContentCatalogPublication } from "#publisher/catalog/publication";
import { planMaterialPublication } from "#publisher/material/plan";
import { planPagePublication } from "#publisher/page/plan";
import { PreparedContentTransitionSchema } from "#publisher/preparation/spec";
import { planQuestionPublication } from "#publisher/question/plan";
import {
  type ReplaySpoolError,
  replaySpoolFailure,
} from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import { routeTransitionForContent } from "#publisher/routes";

const AcceptancePlanSchema = Schema.Struct({
  record: PreparedContentTransitionSchema,
  result: ContentHeadSchema,
});

/** Compiles one fixed genesis corpus through the production family planners. */
interface AcceptanceCatalogInput {
  readonly checkoutRoot: string;
  readonly rendererManifest: RendererManifestEnvelope;
}
type AcceptanceCatalogError =
  | AcceptanceSourceFailure
  | ReplaySpoolError
  | Stream.Error<ReturnType<typeof planArticlePublication<never, never>>>
  | Stream.Error<ReturnType<typeof planMaterialPublication<never, never>>>
  | Stream.Error<ReturnType<typeof planPagePublication<never, never>>>
  | Stream.Error<ReturnType<typeof planQuestionPublication<never, never>>>;

/** Compiles the fixed genesis corpus through the production family planners. */
export const prepareAcceptanceCatalog: (
  input: AcceptanceCatalogInput
) => Effect.Effect<
  ContentCatalogPublication & { readonly tryout: AcceptanceSources["tryout"] },
  AcceptanceCatalogError,
  FileSystem.FileSystem | Path.Path | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareAcceptanceCatalog")(function* (input: {
  readonly checkoutRoot: string;
  readonly rendererManifest: RendererManifestEnvelope;
}) {
  const sources = yield* loadAcceptanceSources(input.checkoutRoot);
  const published = Stream.empty;
  const article = planArticlePublication({
    ...input,
    entries: sources.article,
    published,
  });
  const material = planMaterialPublication({
    ...input,
    entries: sources.material,
    published,
  });
  const page = planPagePublication({
    ...input,
    entries: sources.page,
    published,
  });
  const question = planQuestionPublication({
    ...input,
    ...sources.tryout,
    published,
  });
  const spool = yield* createReplaySpool({
    prefix: "aksara-acceptance-",
    schema: AcceptancePlanSchema,
    stream: article.pipe(
      Stream.concat(material),
      Stream.concat(page),
      Stream.concat(question),
      Stream.mapEffect((plan) =>
        Schema.decodeUnknownEffect(AcceptancePlanSchema)(plan).pipe(
          Effect.mapError((cause) => replaySpoolFailure("decode", cause))
        )
      )
    ),
  });
  const records = spool.replay.pipe(Stream.map((plan) => plan.record));
  const result = spool.replay.pipe(Stream.map((plan) => plan.result));
  return {
    records,
    result,
    routes: records.pipe(Stream.map(routeTransitionForContent)),
    tryout: sources.tryout,
  };
});
