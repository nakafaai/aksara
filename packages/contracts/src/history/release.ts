import { Schema } from "effect";
import { HistoricalAppLocaleSchema } from "#contracts/history/locale";
import {
  compareHistoricalCodeUnits,
  HistoricalPrimitive,
  HistoricalSha256HashSchema,
} from "#contracts/history/primitives";

const {
  ContentKeySchema,
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  SigningKeyIdSchema,
} = HistoricalPrimitive;
const Sha256HashSchema = HistoricalSha256HashSchema;

const EMPTY_HISTORICAL_RESULT_DIGEST = Sha256HashSchema.make(
  "sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd"
);
const EMPTY_HISTORICAL_SNAPSHOT_DIGEST = Sha256HashSchema.make(
  "sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"
);

const HistoricalSnapshotKindSchema = Schema.Literal(
  "program",
  "quran",
  "tryout"
);
type HistoricalSnapshotKind = typeof HistoricalSnapshotKindSchema.Type;

const HistoricalContentFamilySchema = Schema.Literal(
  "article",
  "material",
  "question"
);

const HistoricalReleaseOriginSchema = Schema.Union(
  Schema.Struct({
    kind: Schema.Literal("git"),
    sha: GitCommitShaSchema,
  }),
  Schema.Struct({
    kind: Schema.Literal("rollback"),
    releaseId: ReleaseIdSchema,
  })
);

/** Checks one immutable old snapshot transition without current dependencies. */
function hasCoherentHistoricalSnapshot(state: {
  readonly baseSnapshotId: typeof Sha256HashSchema.Type | null;
  readonly mode: "inherit" | "replace" | "restore";
  readonly resultSnapshotId: typeof Sha256HashSchema.Type | null;
  readonly rowCount: number;
  readonly rowDigest: typeof Sha256HashSchema.Type;
}) {
  const changed = state.baseSnapshotId !== state.resultSnapshotId;
  const empty =
    state.rowCount === 0 &&
    state.rowDigest === EMPTY_HISTORICAL_SNAPSHOT_DIGEST;
  if (state.mode === "inherit") {
    return !changed && empty;
  }
  if (state.mode === "replace") {
    return (
      changed &&
      state.resultSnapshotId !== null &&
      state.rowCount > 0 &&
      state.rowDigest !== EMPTY_HISTORICAL_SNAPSHOT_DIGEST
    );
  }
  return changed && empty;
}

const HistoricalSnapshotStateSchema = Schema.Struct({
  baseSnapshotId: Schema.NullOr(Sha256HashSchema),
  mode: Schema.Literal("inherit", "replace", "restore"),
  resultSnapshotId: Schema.NullOr(Sha256HashSchema),
  rowCount: Schema.Int.pipe(Schema.nonNegative()),
  rowDigest: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCoherentHistoricalSnapshot, {
    message: () => "Stored snapshot transition is not coherent.",
  })
);

const HistoricalSnapshotSetSchema = Schema.Struct({
  program: HistoricalSnapshotStateSchema,
  quran: HistoricalSnapshotStateSchema,
  tryout: HistoricalSnapshotStateSchema,
});
type HistoricalSnapshotSet = typeof HistoricalSnapshotSetSchema.Type;

const HistoricalPublicationIdentitySchema = Schema.Struct({
  contentKey: ContentKeySchema,
  family: HistoricalContentFamilySchema,
  locale: HistoricalAppLocaleSchema,
});
type HistoricalPublicationIdentity =
  typeof HistoricalPublicationIdentitySchema.Type;

/** Orders one immutable historical publication identity exactly as signed. */
function compareHistoricalPublicationIdentities(
  left: HistoricalPublicationIdentity,
  right: HistoricalPublicationIdentity
) {
  const familyOrder = compareHistoricalCodeUnits(left.family, right.family);
  if (familyOrder !== 0) {
    return familyOrder;
  }
  const contentOrder = compareHistoricalCodeUnits(
    left.contentKey,
    right.contentKey
  );
  return contentOrder || compareHistoricalCodeUnits(left.locale, right.locale);
}

/** Checks exact historical scope order without exposing it to current writers. */
function hasCanonicalHistoricalScope(input: {
  readonly content: readonly HistoricalPublicationIdentity[];
  readonly families: readonly (typeof HistoricalContentFamilySchema.Type)[];
  readonly snapshots: readonly HistoricalSnapshotKind[];
}) {
  const contentIsCanonical = input.content.every((identity, index) => {
    const previous = input.content[index - 1];
    return (
      previous === undefined ||
      compareHistoricalPublicationIdentities(previous, identity) < 0
    );
  });
  const familiesAreCanonical = input.families.every((family, index) => {
    const previous = input.families[index - 1];
    return (
      previous === undefined ||
      HistoricalContentFamilySchema.literals.indexOf(previous) <
        HistoricalContentFamilySchema.literals.indexOf(family)
    );
  });
  const snapshotsAreCanonical = input.snapshots.every((snapshot, index) => {
    const previous = input.snapshots[index - 1];
    return (
      previous === undefined ||
      HistoricalSnapshotKindSchema.literals.indexOf(previous) <
        HistoricalSnapshotKindSchema.literals.indexOf(snapshot)
    );
  });
  const contentIsExact = input.content.every(
    ({ family }) => !input.families.includes(family)
  );
  return (
    contentIsCanonical &&
    contentIsExact &&
    familiesAreCanonical &&
    snapshotsAreCanonical &&
    input.content.length + input.families.length + input.snapshots.length > 0
  );
}

const HistoricalPublicationScopeSchema = Schema.Struct({
  content: Schema.Array(HistoricalPublicationIdentitySchema),
  families: Schema.Array(HistoricalContentFamilySchema),
  snapshots: Schema.Array(HistoricalSnapshotKindSchema),
}).pipe(
  Schema.filter(hasCanonicalHistoricalScope, {
    message: () => "Stored publication scope is not canonical.",
  })
);
type HistoricalPublicationScope = typeof HistoricalPublicationScopeSchema.Type;

const NonNegativeCountSchema = Schema.Int.pipe(Schema.nonNegative());

/** Requires immutable stored release provenance to remain self-consistent. */
function hasCoherentHistoricalRelease(input: {
  readonly baseManifestHash: typeof Sha256HashSchema.Type | null;
  readonly baseReleaseId: typeof ReleaseIdSchema.Type | null;
  readonly baseResultCount: number;
  readonly baseResultDigest: typeof Sha256HashSchema.Type;
  readonly deleteCount: number;
  readonly itemCount: number;
  readonly origin: typeof HistoricalReleaseOriginSchema.Type;
  readonly releaseId: typeof ReleaseIdSchema.Type;
  readonly rollbackCount: number;
  readonly scope: HistoricalPublicationScope;
  readonly snapshots: HistoricalSnapshotSet;
  readonly upsertCount: number;
}) {
  if (
    (input.baseReleaseId === null) !== (input.baseManifestHash === null) ||
    input.baseReleaseId === input.releaseId ||
    input.deleteCount + input.upsertCount !== input.itemCount ||
    input.rollbackCount !== input.itemCount
  ) {
    return false;
  }
  const selectedSnapshotsAreCoherent =
    HistoricalSnapshotKindSchema.literals.every(
      (family) =>
        input.scope.snapshots.includes(family) ||
        input.snapshots[family].mode === "inherit"
    );
  if (!selectedSnapshotsAreCoherent) {
    return false;
  }
  if (
    input.baseReleaseId === null &&
    (input.baseResultCount !== 0 ||
      input.baseResultDigest !== EMPTY_HISTORICAL_RESULT_DIGEST)
  ) {
    return false;
  }
  if (
    input.baseReleaseId === null &&
    !Object.values(input.snapshots).every(
      ({ baseSnapshotId }) => baseSnapshotId === null
    )
  ) {
    return false;
  }
  if (input.origin.kind === "git") {
    return Object.values(input.snapshots).every(
      ({ mode }) => mode !== "restore"
    );
  }
  return (
    input.baseReleaseId === input.origin.releaseId &&
    Object.values(input.snapshots).every(({ mode }) => mode !== "replace")
  );
}

export const HistoricalContentReleaseManifestSchema = Schema.Struct({
  baseManifestHash: Schema.NullOr(Sha256HashSchema),
  baseReleaseId: Schema.NullOr(ReleaseIdSchema),
  baseResultCount: NonNegativeCountSchema,
  baseResultDigest: Sha256HashSchema,
  deleteCount: NonNegativeCountSchema,
  itemCount: NonNegativeCountSchema,
  itemsDigest: Sha256HashSchema,
  origin: HistoricalReleaseOriginSchema,
  projectionCount: NonNegativeCountSchema,
  projectionDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  rendererContractVersion: Schema.Literal("1.0.0"),
  rendererManifestHash: Sha256HashSchema,
  resultCount: NonNegativeCountSchema,
  resultDigest: Sha256HashSchema,
  rollbackCount: NonNegativeCountSchema,
  rollbackDigest: Sha256HashSchema,
  routeCount: NonNegativeCountSchema,
  routeDigest: Sha256HashSchema,
  scope: HistoricalPublicationScopeSchema,
  snapshots: HistoricalSnapshotSetSchema,
  upsertCount: NonNegativeCountSchema,
}).pipe(
  Schema.filter(hasCoherentHistoricalRelease, {
    message: () => "Stored release provenance is not coherent.",
  })
);
export type HistoricalContentReleaseManifest =
  typeof HistoricalContentReleaseManifestSchema.Type;

/** Exact signed envelope accepted only by the immutable history reader. */
export const HistoricalSignedContentReleaseSchema = Schema.Struct({
  keyId: SigningKeyIdSchema,
  manifest: HistoricalContentReleaseManifestSchema,
  manifestHash: Sha256HashSchema,
  signature: Ed25519SignatureSchema,
});
