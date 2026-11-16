import { Effect, Equal, Schema } from "effect";
import { consumerFailure as failure } from "#scripts/consumer/tools";
import {
  assertContractPackageMetadata,
  assertPortableDependencies,
  PackageManifestSchema,
  requireManifest,
  textField,
} from "#scripts/manifest";

const EXACT_VERSION_PATTERN =
  /^\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)*)?$/u;

const PackedManifestInputSchema = Schema.Struct({
  effectVersion: Schema.String,
  packedLicense: Schema.String,
  packedManifest: PackageManifestSchema,
  packedReadme: Schema.String,
  sourceLicense: Schema.String,
  sourceManifest: PackageManifestSchema,
});

type PackedManifestInput = typeof PackedManifestInputSchema.Type;

/** Validates archive metadata, failing with the first contract it breaks. */
export const validatePackedManifest = Effect.fn(
  "AksaraContracts.validatePackedConsumerManifest"
)(
  function* ({
    effectVersion,
    packedLicense,
    packedManifest,
    packedReadme,
    sourceLicense,
    sourceManifest,
  }: PackedManifestInput) {
    const p = packedManifest;
    const s = sourceManifest;
    yield* assertContractPackageMetadata(s);
    yield* assertContractPackageMetadata(p);
    yield* requireManifest(
      p.name === s.name,
      "The tarball package name changed"
    );
    yield* requireManifest(
      p.description === s.description,
      "The tarball package description changed"
    );
    yield* requireManifest(
      p.license === "SEE LICENSE IN LICENSE",
      "The tarball must point to its included custom license"
    );
    yield* requireManifest(
      packedLicense === sourceLicense,
      "The tarball must preserve the exact approved software license"
    );
    yield* requireManifest(
      p.engines.node === s.engines.node,
      "The tarball must preserve its Node runtime contract"
    );
    yield* requireManifest(
      packedReadme.trim().length > 0,
      "The tarball README.md must not be empty"
    );
    yield* assertPortableDependencies(p);
    yield* requireManifest(
      Equal.equals(p.imports["#contracts/*"], {
        default: "./dist/*.js",
        types: "./dist/*.d.ts",
      }),
      "The released contract imports must resolve only archive files"
    );
    const packedEffectVersion = yield* textField(
      p.peerDependencies?.effect,
      "The packed contract must declare its exact Effect peer runtime"
    );
    yield* requireManifest(
      EXACT_VERSION_PATTERN.test(packedEffectVersion),
      "The packed Effect peer must be an exact semantic version"
    );
    yield* requireManifest(
      p.dependencies?.effect === undefined,
      "Effect must not be a nested runtime dependency"
    );
    yield* requireManifest(
      packedEffectVersion === effectVersion,
      "Packed and development Effect versions must match"
    );
    return packedEffectVersion;
  },
  Effect.mapError(
    failure("manifest", "Packed contract metadata verification failed")
  )
);
