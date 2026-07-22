import { Effect } from "effect";
import { afterEach, describe, expect, it } from "vitest";
import { decodePreviewEnvironment, readPreviewEnvironment } from "#cli/env";

const originalOverride = process.env.NAKAFA_APP_DIR;

afterEach(() => {
  if (originalOverride === undefined) {
    delete process.env.NAKAFA_APP_DIR;
    return;
  }
  process.env.NAKAFA_APP_DIR = originalOverride;
});

describe("preview environment", () => {
  it("decodes absent and explicit Nakafa checkout paths", async () => {
    await expect(
      Effect.runPromise(decodePreviewEnvironment({}))
    ).resolves.toEqual({});
    await expect(
      Effect.runPromise(
        decodePreviewEnvironment({ NAKAFA_APP_DIR: "/code/nakafa.com" })
      )
    ).resolves.toEqual({ nakafaAppDir: "/code/nakafa.com" });
  });

  it.each(["", "   "])("rejects invalid override %j", async (value) => {
    const error = await Effect.runPromise(
      decodePreviewEnvironment({ NAKAFA_APP_DIR: value }).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PreviewEnvironmentError",
      variable: "NAKAFA_APP_DIR",
    });
  });

  it("reads only the approved process variable through the typed boundary", async () => {
    process.env.NAKAFA_APP_DIR = "/code/explicit-nakafa";
    await expect(Effect.runPromise(readPreviewEnvironment())).resolves.toEqual({
      nakafaAppDir: "/code/explicit-nakafa",
    });
  });
});
