// @vitest-environment node

import { NodeFileSystem } from "@effect/platform-node";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { loadRichFixture } from "./fixture.js";

describe("loadRichFixture", () => {
  it("loads two localized compiler requests and their renderer contract", async () => {
    const requests = await Effect.runPromise(
      loadRichFixture().pipe(Effect.provide(NodeFileSystem.layer))
    );

    expect(requests.map(({ locale }) => locale)).toEqual(["en", "id"]);
    expect(requests.map(({ contentKey }) => contentKey)).toEqual([
      "fixture:function-machine",
      "fixture:function-machine",
    ]);
    for (const request of requests) {
      expect(request.rawMdx).toContain("export const metadata");
      expect(request.rawMdx).toContain("<BlockMath");
      expect(request.rawMdx).toContain("<FunctionMachine");
      expect(request.rendererManifest.authoringComponents).toEqual([
        { name: "BlockMath", version: 1 },
        { name: "FunctionMachine", version: 1 },
      ]);
    }
  });
});
