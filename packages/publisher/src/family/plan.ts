import {
  type ContentHeadIdentity,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import type { ContentDeliveryClass } from "@nakafa/aksara-contracts/delivery";
import type {
  CorpusSourcePath,
  PublicPath,
  Sha256Hash,
} from "@nakafa/aksara-contracts/ids";
import { ContentDeleteSchema } from "@nakafa/aksara-contracts/release";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import type { RollbackSnapshotState } from "@nakafa/aksara-contracts/release/rollback";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Order, Stream, Tuple } from "effect";
import type {
  PreparedContentTransition,
  PreparedContentUpsert,
} from "#publisher/preparation/spec";

interface FamilyEntry {
  readonly delivery: ContentDeliveryClass;
  readonly rendererDomain: RendererDomain;
  readonly sourcePath: CorpusSourcePath;
}

interface InspectedFamilyDocument {
  readonly inspection: {
    readonly compilerConfigHash: Sha256Hash;
    readonly sourceHash: Sha256Hash;
  };
  readonly projectionHash: Sha256Hash;
}

interface FamilyIdentityAdapter<Entry extends FamilyEntry> {
  /** Selects the stable locale-specific head identity for one source entry. */
  readonly identity: (entry: Entry) => ContentHeadIdentity;
  /** Selects public route ownership only for route-bearing source entries. */
  readonly publicPath: (entry: Entry) => PublicPath | undefined;
}

type FamilyDiff<Entry, Head> =
  | { readonly entry: Entry; readonly kind: "current" }
  | { readonly entry: Entry; readonly head: Head; readonly kind: "matched" }
  | { readonly head: Head; readonly kind: "published" };

/** One family-local transition, desired head, or both from one diff row. */
export interface FamilyPublicationPlan<Head extends ContentHead> {
  readonly record?: PreparedContentTransition;
  readonly result?: Head;
}

interface FamilyPlanAdapter<
  Entry extends FamilyEntry,
  Head extends ContentHead,
  Document extends InspectedFamilyDocument,
  InspectError,
  InspectContext,
  CompileError,
  CompileContext,
> extends FamilyIdentityAdapter<Entry> {
  /** Captures the absent pre-release state for one newly authored entry. */
  readonly absent: (entry: Entry) => RollbackSnapshotState;
  /** Compiles one inspected family document into a signed release transition. */
  readonly compile: (
    document: Document,
    rendererManifest: RendererManifestEnvelope
  ) => Effect.Effect<PreparedContentUpsert, CompileError, CompileContext>;
  /** Derives the desired published head from one compiled upsert. */
  readonly head: (record: PreparedContentUpsert) => Head;
  /** Reads and validates one authored document before compilation. */
  readonly inspect: (
    checkoutRoot: string,
    rendererManifest: RendererManifestEnvelope,
    entry: Entry
  ) => Effect.Effect<Document, InspectError, InspectContext>;
  /** Captures the pre-release state of one currently published head. */
  readonly prior: (head: Head) => RollbackSnapshotState;
}

/** Compares every authored and compiler-owned fingerprint in one matched head. */
function isUnchanged<Entry extends FamilyEntry>(
  adapter: FamilyIdentityAdapter<Entry>,
  entry: Entry,
  document: InspectedFamilyDocument,
  head: ContentHead
) {
  return (
    head.compilerConfigHash === document.inspection.compilerConfigHash &&
    head.delivery === entry.delivery &&
    head.projectionHash === document.projectionHash &&
    head.publicPath === adapter.publicPath(entry) &&
    head.rendererDomain === entry.rendererDomain &&
    head.sourceHash === document.inspection.sourceHash &&
    head.sourcePath === entry.sourcePath
  );
}

/** Builds a canonical constant-space diff from one registry and head family. */
function diffFamilyHeads<
  Entry extends FamilyEntry,
  Head extends ContentHead,
  E,
  R,
>(
  adapter: Pick<FamilyIdentityAdapter<Entry>, "identity">,
  entries: readonly Entry[],
  published: Stream.Stream<Head, E, R>
) {
  const current = Stream.fromIterable(entries).pipe(
    Stream.map((entry) =>
      Tuple.make(headIdentity(adapter.identity(entry)), entry)
    )
  );
  const prior = published.pipe(
    Stream.map((head) => Tuple.make(headIdentity(head), head))
  );
  return Stream.zipAllSortedByKeyWith(current, {
    onBoth: (entry, head): FamilyDiff<Entry, Head> => ({
      entry,
      head,
      kind: "matched",
    }),
    onOther: (head): FamilyDiff<Entry, Head> => ({
      head,
      kind: "published",
    }),
    onSelf: (entry): FamilyDiff<Entry, Head> => ({
      entry,
      kind: "current",
    }),
    order: Order.string,
    other: prior,
  }).pipe(Stream.map(([, diff]) => diff));
}

/** Plans one deletion, unchanged head, or compiled replacement generically. */
const prepareFamilyDiff = Effect.fn("AksaraPublisher.prepareFamilyDiff")(
  function* <
    Entry extends FamilyEntry,
    Head extends ContentHead,
    Document extends InspectedFamilyDocument,
    InspectError,
    InspectContext,
    CompileError,
    CompileContext,
  >(input: {
    readonly adapter: FamilyPlanAdapter<
      Entry,
      Head,
      Document,
      InspectError,
      InspectContext,
      CompileError,
      CompileContext
    >;
    readonly checkoutRoot: string;
    readonly diff: FamilyDiff<Entry, Head>;
    readonly rendererManifest: RendererManifestEnvelope;
  }) {
    const { adapter, diff } = input;
    if (diff.kind === "published") {
      return {
        record: {
          prior: adapter.prior(diff.head),
          record: {
            change: ContentDeleteSchema.make({
              contentKey: diff.head.contentKey,
              family: diff.head.family,
              locale: diff.head.locale,
              operation: "delete",
            }),
          },
        },
      } satisfies FamilyPublicationPlan<Head>;
    }

    const document = yield* adapter.inspect(
      input.checkoutRoot,
      input.rendererManifest,
      diff.entry
    );
    if (
      diff.kind === "matched" &&
      isUnchanged(adapter, diff.entry, document, diff.head)
    ) {
      return { result: diff.head } satisfies FamilyPublicationPlan<Head>;
    }

    const record = yield* adapter.compile(document, input.rendererManifest);
    return {
      record: {
        prior:
          diff.kind === "matched"
            ? adapter.prior(diff.head)
            : adapter.absent(diff.entry),
        record,
      },
      result: adapter.head(record),
    } satisfies FamilyPublicationPlan<Head>;
  }
);

/** Streams a family-local desired catalog and its minimal body transitions. */
export function planFamilyPublication<
  Entry extends FamilyEntry,
  Head extends ContentHead,
  Document extends InspectedFamilyDocument,
  InspectError,
  InspectContext,
  CompileError,
  CompileContext,
  PublishedError,
  PublishedContext,
>(input: {
  readonly adapter: FamilyPlanAdapter<
    Entry,
    Head,
    Document,
    InspectError,
    InspectContext,
    CompileError,
    CompileContext
  >;
  readonly checkoutRoot: string;
  readonly entries: readonly Entry[];
  readonly published: Stream.Stream<Head, PublishedError, PublishedContext>;
  readonly rendererManifest: RendererManifestEnvelope;
}): Stream.Stream<
  FamilyPublicationPlan<Head>,
  CompileError | InspectError | PublishedError,
  CompileContext | InspectContext | PublishedContext
> {
  return diffFamilyHeads(input.adapter, input.entries, input.published).pipe(
    Stream.mapEffect((diff) =>
      prepareFamilyDiff({
        adapter: input.adapter,
        checkoutRoot: input.checkoutRoot,
        diff,
        rendererManifest: input.rendererManifest,
      })
    )
  );
}
