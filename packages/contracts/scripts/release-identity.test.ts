import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import {
  compareVersions,
  decideArchive,
  latestIdentity,
  packageIdentity,
  parseVersion,
  resolveIdentity,
} from "#scripts/release-identity";

/** Runs one typed identity operation at the test boundary. */
function run<A, E>(effect: Effect.Effect<A, E>) {
  return Effect.runPromise(effect);
}

/** Exposes one expected identity failure at the test boundary. */
function reject<A, E>(effect: Effect.Effect<A, E>) {
  return Effect.runPromise(effect.pipe(Effect.flip));
}

describe("contract release identity", () => {
  it("decodes package identity and orders every semantic version field", async () => {
    const identity = await run(
      packageIdentity('{"name":"@nakafa/aksara-contracts","version":"1.2.3"}')
    );

    expect(identity.assetName).toBe("nakafa-aksara-contracts-1.2.3.tgz");
    expect(compareVersions(identity, await run(parseVersion("0.9.9")))).toBe(1);
    expect(compareVersions(identity, await run(parseVersion("1.1.9")))).toBe(1);
    expect(compareVersions(identity, await run(parseVersion("1.2.2")))).toBe(1);
    expect(compareVersions(identity, await run(parseVersion("1.2.3")))).toBe(0);
    expect(
      await run(latestIdentity("contracts-v1.0.0\ncontracts-v0.9.9\n"))
    ).toEqual(await run(parseVersion("1.0.0")));
  });

  it("rejects malformed, unsafe, or contradictory identities", async () => {
    await expect(reject(parseVersion("1.0"))).resolves.toMatchObject({
      detail: expect.stringContaining("stable semantic version"),
    });
    await expect(
      reject(parseVersion("9007199254740992.0.0"))
    ).resolves.toMatchObject({
      detail: expect.stringContaining("safe integer bounds"),
    });
    await expect(reject(packageIdentity("[]"))).resolves.toMatchObject({
      reason: "identity",
    });
    await expect(
      reject(packageIdentity('{"name":"wrong","version":"0.1.0"}'))
    ).resolves.toMatchObject({ reason: "identity" });
    await expect(
      reject(packageIdentity('{"name":"@nakafa/aksara-contracts","version":1}'))
    ).resolves.toMatchObject({ reason: "identity" });
    await expect(
      reject(latestIdentity("contracts-vnext\n"))
    ).resolves.toMatchObject({
      detail: expect.stringContaining("not a stable release tag"),
    });
    await expect(
      run(
        resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
          ""
        )
      )
    ).resolves.toMatchObject({ latest: undefined });
    await expect(
      reject(
        resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.2.0"}',
          ""
        )
      )
    ).resolves.toMatchObject({
      detail: expect.stringContaining("first contract release"),
    });
    await expect(
      reject(
        resolveIdentity(
          '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
          "contracts-v0.2.0\n"
        )
      )
    ).resolves.toMatchObject({
      detail: expect.stringContaining("older than"),
    });
  });

  it("decides publication only from exact deterministic archive bytes", async () => {
    const first = await run(
      resolveIdentity(
        '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
        ""
      )
    );
    const current = Buffer.from("current");

    await expect(
      run(decideArchive(first, current, undefined))
    ).resolves.toMatchObject({ mode: "create", size: 7 });
    await expect(
      reject(decideArchive(first, current, current))
    ).resolves.toMatchObject({
      detail: expect.stringContaining("cannot have a previous archive"),
    });

    const unchanged = await run(
      resolveIdentity(
        '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}',
        "contracts-v0.1.0\n"
      )
    );
    await expect(
      run(decideArchive(unchanged, current, current))
    ).resolves.toMatchObject({ mode: "unchanged" });
    await expect(
      reject(decideArchive(unchanged, current, undefined))
    ).resolves.toMatchObject({
      detail: expect.stringContaining("must be downloaded"),
    });
    await expect(
      reject(decideArchive(unchanged, current, Buffer.from("previous")))
    ).resolves.toMatchObject({
      detail: expect.stringContaining("changed without a package version bump"),
    });

    const changed = await run(
      resolveIdentity(
        '{"name":"@nakafa/aksara-contracts","version":"0.2.0"}',
        "contracts-v0.1.0\n"
      )
    );
    await expect(
      run(decideArchive(changed, current, Buffer.from("previous")))
    ).resolves.toMatchObject({ mode: "create" });
  });
});
