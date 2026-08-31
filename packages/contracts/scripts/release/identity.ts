import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";

const CONTRACT_NAME = "@nakafa/aksara-contracts";
const FIRST_VERSION = "0.1.0";
const VERSION_PATTERN = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/u;
const ARCHIVE_PATTERN =
  /^nakafa-aksara-contracts-((?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*))\.tgz$/u;
const LINE_PATTERN = /\r?\n/u;

const PackageIdentitySchema = Schema.fromJsonString(
  Schema.Struct({
    name: Schema.Literal(CONTRACT_NAME),
    version: Schema.String,
  })
);

/** Stable contract package identity used by its archive and release tag. */
export interface ContractIdentity {
  readonly assetName: string;
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
  readonly releaseTag: string;
  readonly version: string;
}

/** Current package identity and the newest released contract, when one exists. */
export interface IdentityPlan {
  readonly current: ContractIdentity;
  readonly latest: ContractIdentity | undefined;
}

/** Exact archive facts and whether publication is required. */
export interface ArchiveDecision {
  readonly identity: ContractIdentity;
  readonly mode: "create" | "unchanged";
  readonly sha256: string;
  readonly size: number;
}

/** One expected contract release validation or identity failure. */
export class ContractReleaseError extends Schema.TaggedError<ContractReleaseError>()(
  "ContractReleaseError",
  {
    detail: Schema.String,
    reason: Schema.Literals([
      "archive",
      "argument",
      "identity",
      "platform",
      "release",
    ]),
  }
) {}

/** Creates one stable typed contract release failure. */
export function releaseError(
  reason: typeof ContractReleaseError.fields.reason.Type,
  detail: string
) {
  return new ContractReleaseError({ detail, reason });
}

/** Parses one stable semantic version without evaluating tag-controlled text. */
export const parseVersion = Effect.fn("AksaraContracts.parseVersion")(
  function* (version: string, releaseTag = `${CONTRACT_NAME}@${version}`) {
    const match = VERSION_PATTERN.exec(version);
    if (!match) {
      return yield* releaseError(
        "identity",
        `Contract version ${version} must be stable semantic version`
      );
    }
    const major = Number(match[1]);
    const minor = Number(match[2]);
    const patch = Number(match[3]);
    if (![major, minor, patch].every(Number.isSafeInteger)) {
      return yield* releaseError(
        "identity",
        `Contract version ${version} exceeds safe integer bounds`
      );
    }
    return {
      assetName: `nakafa-aksara-contracts-${version}.tgz`,
      major,
      minor,
      patch,
      releaseTag,
      version,
    } satisfies ContractIdentity;
  }
);

/** Orders two stable contract versions without shell arithmetic. */
export function compareVersions(
  left: ContractIdentity,
  right: ContractIdentity
): number {
  if (left.major !== right.major) {
    return left.major - right.major;
  }
  if (left.minor !== right.minor) {
    return left.minor - right.minor;
  }
  return left.patch - right.patch;
}

/** Decodes the one package name and version that own contract release identity. */
export const packageIdentity = Effect.fn("AksaraContracts.packageIdentity")(
  function* (source: string) {
    const manifest = yield* Schema.decodeEffect(PackageIdentitySchema)(source, {
      onExcessProperty: "ignore",
    }).pipe(
      Effect.mapError(() =>
        releaseError(
          "identity",
          "The contract package manifest must contain its exact name and text version"
        )
      )
    );
    return yield* parseVersion(manifest.version);
  }
);

/** Resolves the newest immutable archive without depending on historical tag syntax. */
export const latestIdentity = Effect.fn("AksaraContracts.latestIdentity")(
  function* (source: string) {
    const identities: ContractIdentity[] = [];
    const versions = new Set<string>();
    for (const release of source.split(LINE_PATTERN).filter(Boolean)) {
      const [releaseTag, assetName, ...extra] = release.split("\t");
      if (!(releaseTag && assetName) || extra.length > 0) {
        return yield* releaseError(
          "identity",
          "Contract release metadata must pair one tag with one stable archive"
        );
      }
      const version = ARCHIVE_PATTERN.exec(assetName)?.[1];
      if (!version) {
        return yield* releaseError(
          "identity",
          "Contract release metadata must reference one stable package archive"
        );
      }
      if (versions.has(version)) {
        return yield* releaseError(
          "identity",
          `Contract version ${version} has multiple immutable releases`
        );
      }
      versions.add(version);
      identities.push(yield* parseVersion(version, releaseTag));
    }
    return identities.sort(compareVersions).at(-1);
  }
);

/** Validates the source version against every immutable contract release asset. */
export const resolveIdentity = Effect.fn("AksaraContracts.resolveIdentity")(
  function* (packageSource: string, releasesSource: string) {
    const current = yield* packageIdentity(packageSource);
    const latest = yield* latestIdentity(releasesSource);
    if (!latest) {
      if (current.version !== FIRST_VERSION) {
        return yield* releaseError(
          "identity",
          `The first contract release must be ${FIRST_VERSION}`
        );
      }
      return { current, latest } satisfies IdentityPlan;
    }
    if (compareVersions(current, latest) < 0) {
      return yield* releaseError(
        "identity",
        `Contract version ${current.version} is older than ${latest.version}`
      );
    }
    return { current, latest } satisfies IdentityPlan;
  }
);

/** Decides release necessity from deterministic archive bytes, not path guesses. */
export const decideArchive = Effect.fn("AksaraContracts.decideArchive")(
  function* (
    plan: IdentityPlan,
    currentBytes: Uint8Array,
    previousBytes: Uint8Array | undefined
  ) {
    const sha256 = createHash("sha256").update(currentBytes).digest("hex");
    const size = currentBytes.byteLength;
    if (!plan.latest) {
      if (previousBytes !== undefined) {
        return yield* releaseError(
          "archive",
          "The first contract release cannot have a previous archive"
        );
      }
      return {
        identity: plan.current,
        mode: "create",
        sha256,
        size,
      } satisfies ArchiveDecision;
    }
    if (!previousBytes) {
      return yield* releaseError(
        "archive",
        "The latest contract archive must be downloaded"
      );
    }
    const comparison = compareVersions(plan.current, plan.latest);
    if (comparison === 0) {
      if (!Buffer.from(currentBytes).equals(Buffer.from(previousBytes))) {
        return yield* releaseError(
          "archive",
          "Contract archive bytes changed without a package version bump"
        );
      }
      return {
        identity: plan.current,
        mode: "unchanged",
        sha256,
        size,
      } satisfies ArchiveDecision;
    }
    return {
      identity: plan.current,
      mode: "create",
      sha256,
      size,
    } satisfies ArchiveDecision;
  }
);
