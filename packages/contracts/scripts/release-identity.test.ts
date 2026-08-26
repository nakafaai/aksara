import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import {
  compareVersions,
  decideArchive,
  latestIdentity,
  packageIdentity,
  parseVersion,
  resolveIdentity,
} from "#scripts/release-identity";

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
          yield* latestIdentity("contracts-v1.0.0\ncontracts-v0.9.9\n")
        ).toEqual(yield* parseVersion("1.0.0"));
      })
  );

  it.effect("rejects malformed, unsafe, or contradictory identities", () =>
    Effect.gen(function* () {
      expect(yield* Effect.flip(parseVersion("1.0"))).toMatchObject({
        detail: expect.stringContaining("stable semantic version"),
      });
      expect(
        yield* Effect.flip(parseVersion("9007199254740992.0.0"))
      ).toMatchObject({
        detail: expect.stringContaining("safe integer bounds"),
      });
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
      expect(
        yield* Effect.flip(latestIdentity("contracts-vnext\n"))
      ).toMatchObject({
        detail: expect.stringContaining("not a stable release tag"),
      });
      expect(
        yield* resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
          ""
        )
      ).toMatchObject({ latest: undefined });
      expect(
        yield* Effect.flip(
          resolveIdentity(
            '{"name":"@nakafa/aksara-contracts","version":"0.2.0"}',
            ""
          )
        )
      ).toMatchObject({
        detail: expect.stringContaining("first contract release"),
      });
      expect(
        yield* Effect.flip(
          resolveIdentity(
            '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
            "contracts-v0.2.0\n"
          )
        )
      ).toMatchObject({
        detail: expect.stringContaining("older than"),
      });
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
        expect(
          yield* Effect.flip(decideArchive(first, current, current))
        ).toMatchObject({
          detail: expect.stringContaining("cannot have a previous archive"),
        });

        const unchanged = yield* resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
          "contracts-v0.1.0\n"
        );
        expect(yield* decideArchive(unchanged, current, current)).toMatchObject(
          {
            mode: "unchanged",
          }
        );
        expect(
          yield* Effect.flip(decideArchive(unchanged, current, undefined))
        ).toMatchObject({
          detail: expect.stringContaining("must be downloaded"),
        });
        expect(
          yield* Effect.flip(
            decideArchive(
              unchanged,
              current,
              new TextEncoder().encode("previous")
            )
          )
        ).toMatchObject({
          detail: expect.stringContaining(
            "changed without a package version bump"
          ),
        });

        const changed = yield* resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.2.0"}',
          "contracts-v0.1.0\n"
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
