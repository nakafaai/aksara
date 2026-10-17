import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import {
  compareVersions,
  decideArchive,
  latestIdentity,
  packageIdentity,
  parseVersion,
  resolveIdentity,
} from "#scripts/release/identity";
import { withArchiveDigestFailure } from "#scripts/test/digest";

/** Encodes one immutable release row from its real tag and package version. */
function release(tag: string, version: string) {
  return `${tag}\tnakafa-aksara-contracts-${version}.tgz\n`;
}

/** Expects one identity computation to fail with a detail that contains the given text. */
const expectDetail = Effect.fn("ContractReleaseIdentityTest.expectDetail")(
  function* <A, E>(computation: Effect.Effect<A, E>, detail: string) {
    expect(yield* Effect.flip(computation)).toMatchObject({
      detail: expect.stringContaining(detail),
    });
  }
);

describe("contract release identity", () => {
  it.effect(
    "decodes package identity and orders every semantic version field",
    () =>
      Effect.gen(function* () {
        const identity = yield* packageIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"1.2.3"}'
        );

        expect(identity.assetName).toBe("nakafa-aksara-contracts-1.2.3.tgz");
        expect(compareVersions(identity, yield* parseVersion("0.9.9"))).toBe(1);
        expect(compareVersions(identity, yield* parseVersion("1.1.9"))).toBe(1);
        expect(compareVersions(identity, yield* parseVersion("1.2.2"))).toBe(1);
        expect(compareVersions(identity, yield* parseVersion("1.2.3"))).toBe(0);
        expect(
          yield* latestIdentity(
            `${release("contracts-v1.0.0", "1.0.0")}${release(
              "contracts-v0.9.9",
              "0.9.9"
            )}`
          )
        ).toEqual(yield* parseVersion("1.0.0", "contracts-v1.0.0"));
        expect(identity.releaseTag).toBe("@nakafa/aksara-contracts@1.2.3");
      })
  );

  it.effect("rejects malformed, unsafe, or contradictory identities", () =>
    Effect.gen(function* () {
      yield* expectDetail(parseVersion("1.0"), "stable semantic version");
      yield* expectDetail(
        parseVersion("9007199254740992.0.0"),
        "safe integer bounds"
      );
      expect(yield* Effect.flip(packageIdentity("[]"))).toMatchObject({
        reason: "identity",
      });
      expect(
        yield* Effect.flip(
          packageIdentity('{"name":"wrong","version":"0.1.0"}')
        )
      ).toMatchObject({ reason: "identity" });
      expect(
        yield* Effect.flip(
          packageIdentity('{"name":"@nakafa/aksara-contracts","version":1}')
        )
      ).toMatchObject({ reason: "identity" });
      yield* expectDetail(latestIdentity("contracts-vnext\n"), "pair one tag");
      yield* expectDetail(
        latestIdentity(
          "contracts-v0.1.0\tnakafa-aksara-contracts-0.1.0.tgz\textra\n"
        ),
        "pair one tag"
      );
      yield* expectDetail(
        latestIdentity("contracts-v0.1.0\twrong.tgz\n"),
        "stable package archive"
      );
      yield* expectDetail(
        latestIdentity(
          `${release("contracts-v0.1.0", "0.1.0")}${release(
            "@nakafa/aksara-contracts@0.1.0",
            "0.1.0"
          )}`
        ),
        "multiple immutable releases"
      );
      expect(
        yield* resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
          ""
        )
      ).toMatchObject({ latest: undefined });
      yield* expectDetail(
        resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.2.0"}',
          ""
        ),
        "first contract release"
      );
      yield* expectDetail(
        resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
          release("contracts-v0.2.0", "0.2.0")
        ),
        "older than"
      );
    })
  );

  it.effect(
    "decides publication only from exact deterministic archive bytes",
    () =>
      Effect.gen(function* () {
        const first = yield* resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
          ""
        );
        const current = new TextEncoder().encode("current");

        expect(yield* decideArchive(first, current, undefined)).toMatchObject({
          mode: "create",
          size: 7,
        });
        yield* expectDetail(
          decideArchive(first, current, current),
          "cannot have a previous archive"
        );

        const unchanged = yield* resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
          release("contracts-v0.1.0", "0.1.0")
        );
        expect(yield* decideArchive(unchanged, current, current)).toMatchObject(
          {
            mode: "unchanged",
          }
        );
        yield* expectDetail(
          decideArchive(unchanged, current, undefined),
          "must be downloaded"
        );
        yield* expectDetail(
          decideArchive(
            unchanged,
            current,
            new TextEncoder().encode("previous")
          ),
          "changed without a package version bump"
        );

        const changed = yield* resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.2.0"}',
          release("contracts-v0.1.0", "0.1.0")
        );
        expect(
          yield* decideArchive(
            changed,
            current,
            new TextEncoder().encode("previous")
          )
        ).toMatchObject({ mode: "create" });
      })
  );
});

describe("pinned release identities", () => {
  it.effect(
    "pins the exact identity and release tag of one stable version",
    () =>
      Effect.gen(function* () {
        expect(yield* parseVersion("0.46.0")).toEqual({
          assetName: "nakafa-aksara-contracts-0.46.0.tgz",
          major: 0,
          minor: 46,
          patch: 0,
          releaseTag: "@nakafa/aksara-contracts@0.46.0",
          version: "0.46.0",
        });
      })
  );

  it.effect(
    "selects the numerically newest release regardless of row order",
    () =>
      Effect.gen(function* () {
        expect(
          yield* latestIdentity(
            "@nakafa/aksara-contracts@0.9.0\tnakafa-aksara-contracts-0.9.0.tgz\n@nakafa/aksara-contracts@0.10.0\tnakafa-aksara-contracts-0.10.0.tgz\n@nakafa/aksara-contracts@0.9.1\tnakafa-aksara-contracts-0.9.1.tgz\n"
          )
        ).toEqual({
          assetName: "nakafa-aksara-contracts-0.10.0.tgz",
          major: 0,
          minor: 10,
          patch: 0,
          releaseTag: "@nakafa/aksara-contracts@0.10.0",
          version: "0.10.0",
        });
      })
  );

  it.effect("pins the package identity decoded from non-ASCII metadata", () =>
    Effect.gen(function* () {
      expect(
        yield* packageIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.46.0","description":"Skema Ñandú untuk Nakafa 😀"}'
        )
      ).toEqual({
        assetName: "nakafa-aksara-contracts-0.46.0.tgz",
        major: 0,
        minor: 46,
        patch: 0,
        releaseTag: "@nakafa/aksara-contracts@0.46.0",
        version: "0.46.0",
      });
    })
  );

  it.effect(
    "pins the archive SHA-256 and first-release decision for exact bytes",
    () =>
      Effect.gen(function* () {
        expect(
          yield* decideArchive(
            { current: yield* parseVersion("0.1.0"), latest: undefined },
            new TextEncoder().encode("Arsip Ñandú 😀"),
            undefined
          )
        ).toEqual({
          identity: {
            assetName: "nakafa-aksara-contracts-0.1.0.tgz",
            major: 0,
            minor: 1,
            patch: 0,
            releaseTag: "@nakafa/aksara-contracts@0.1.0",
            version: "0.1.0",
          },
          mode: "create",
          sha256:
            "798defd9f59b94bb2b7669f149bf988ff51c164021507ae00280e73dbd430f77",
          size: 18,
        });
      })
  );

  it.effect("maps a failed archive digest into an archive error", () =>
    Effect.gen(function* () {
      const error = yield* withArchiveDigestFailure(
        decideArchive(
          { current: yield* parseVersion("0.1.0"), latest: undefined },
          new TextEncoder().encode("Arsip"),
          undefined
        )
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        detail: "The current contract archive cannot be hashed.",
        reason: "archive",
      });
    })
  );

  it.effect(
    "pins the release plan for the current package and newest release",
    () =>
      Effect.gen(function* () {
        expect(
          yield* resolveIdentity(
            '{"name":"@nakafa/aksara-contracts","version":"0.46.0"}',
            "@nakafa/aksara-contracts@0.9.0\tnakafa-aksara-contracts-0.9.0.tgz\n@nakafa/aksara-contracts@0.10.0\tnakafa-aksara-contracts-0.10.0.tgz\n@nakafa/aksara-contracts@0.9.1\tnakafa-aksara-contracts-0.9.1.tgz\n"
          )
        ).toEqual({
          current: {
            assetName: "nakafa-aksara-contracts-0.46.0.tgz",
            major: 0,
            minor: 46,
            patch: 0,
            releaseTag: "@nakafa/aksara-contracts@0.46.0",
            version: "0.46.0",
          },
          latest: {
            assetName: "nakafa-aksara-contracts-0.10.0.tgz",
            major: 0,
            minor: 10,
            patch: 0,
            releaseTag: "@nakafa/aksara-contracts@0.10.0",
            version: "0.10.0",
          },
        });
      })
  );
});
