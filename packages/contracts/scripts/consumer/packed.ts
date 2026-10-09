import assert from "node:assert/strict";
import { Effect, Schema } from "effect";
import { consumerFailure as failure } from "#scripts/consumer/tools";
import {
  assertContractPackageMetadata,
  assertPortableDependencies,
  PackageManifestSchema,
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

/** Validates archive metadata while converting assertion throws to typed data. */
export const validatePackedManifest = Effect.fn(
  "AksaraContracts.validatePackedConsumerManifest"
)(
  ({
    effectVersion,
    packedLicense,
    packedManifest,
    packedReadme,
    sourceLicense,
    sourceManifest,
  }: PackedManifestInput) =>
    Effect.try({
      catch: failure(
        "manifest",
        "Packed contract metadata verification failed"
      ),
      try: () => {
        const p = packedManifest;
        const s = sourceManifest;
        assertContractPackageMetadata(s);
        assertContractPackageMetadata(p);
        assert.equal(p.name, s.name, "The tarball package name changed");
        assert.equal(
          p.description,
          s.description,
          "The tarball package description changed"
        );
        assert.equal(
          p.license,
          "SEE LICENSE IN LICENSE",
          "The tarball must point to its included custom license"
        );
        assert.equal(
          packedLicense,
          sourceLicense,
          "The tarball must preserve the exact approved software license"
        );
        assert.equal(
          p.engines.node,
          s.engines.node,
          "The tarball must preserve its Node runtime contract"
        );
        assert.ok(
          packedReadme.trim().length > 0,
          "The tarball README.md must not be empty"
        );
        assertPortableDependencies(p);
        assert.deepEqual(
          p.imports["#contracts/*"],
          {
            default: "./dist/*.js",
            types: "./dist/*.d.ts",
          },
          "The released contract imports must resolve only archive files"
        );
        const packedEffectVersion = textField(
          p.peerDependencies?.effect,
          "The packed contract must declare its exact Effect peer runtime"
        );
        assert.match(
          packedEffectVersion,
          EXACT_VERSION_PATTERN,
          "The packed Effect peer must be an exact semantic version"
        );
        assert.equal(
          p.dependencies?.effect,
          undefined,
          "Effect must not be a nested runtime dependency"
        );
        assert.equal(
          packedEffectVersion,
          effectVersion,
          "Packed and development Effect versions must match"
        );
        return packedEffectVersion;
      },
    })
);
