import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { MAX_HEAD_PAGE_COUNT } from "@nakafa/aksara-contracts/transport/limits";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
import { streamContentHeads } from "#publisher/heads";
import { PublicationTarget } from "#publisher/publication/spec";
import { makePublicationTarget } from "#test/target";

const activeReleaseId = ReleaseIdSchema.make("release-active");
const activeManifestHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);

/** Creates one exact compact material head for pagination tests. */
function makeHead(contentKey: string, hashCharacter: string) {
  const hash = `sha256:${hashCharacter.repeat(64)}`;
  return Schema.decodeUnknownSync(MaterialHeadSchema)({
    artifactHash: hash,
    compilerConfigHash: hash,
    contentKey,
    delivery: "public",
    family: "material",
    locale: "en",
    projectionHash: hash,
    publicPath: `subjects/test/${contentKey}`,
    rendererDomain: "mathematics",
    sourceHash: hash,
    sourcePath: `packages/corpus/material/${contentKey}/en.mdx`,
  });
}

const firstHead = makeHead("material-a", "a");
const secondHead = makeHead("material-b", "b");

/** Creates a complete target whose only live capability is head pagination. */
function makeTarget(headPage: typeof PublicationTarget.Service.headPage) {
  return makePublicationTarget({ headPage });
}

/** Collects a material head stream through one supplied target service. */
function collectHeads(target: typeof PublicationTarget.Service) {
  return Effect.runPromise(
    streamContentHeads(activeReleaseId, activeManifestHash, "material").pipe(
      Stream.runCollect,
      Effect.map(Array.from),
      Effect.provideService(PublicationTarget, target)
    )
  );
}

/** Returns the typed head-stream failure without a FiberFailure wrapper. */
function rejectHeads(target: typeof PublicationTarget.Service) {
  return Effect.runPromise(
    streamContentHeads(activeReleaseId, activeManifestHash, "material").pipe(
      Stream.runDrain,
      Effect.provideService(PublicationTarget, target),
      Effect.flip
    )
  );
}

describe("material head stream", () => {
  it("reads canonical pages with an exact active release and maximum limit", async () => {
    const headPage = vi
      .fn()
      .mockReturnValueOnce(
        Effect.succeed({
          activeManifestHash,
          activeReleaseId,
          cursor: null,
          done: false,
          family: "material",
          heads: [firstHead],
          nextCursor: "cursor-one",
        })
      )
      .mockReturnValueOnce(
        Effect.succeed({
          activeManifestHash,
          activeReleaseId,
          cursor: "cursor-one",
          done: true,
          family: "material",
          heads: [secondHead],
          nextCursor: null,
        })
      );

    await expect(collectHeads(makeTarget(headPage))).resolves.toEqual([
      firstHead,
      secondHead,
    ]);
    expect(headPage).toHaveBeenNthCalledWith(1, {
      activeManifestHash,
      activeReleaseId,
      cursor: null,
      family: "material",
      limit: MAX_HEAD_PAGE_COUNT,
    });
    expect(headPage).toHaveBeenNthCalledWith(2, {
      activeManifestHash,
      activeReleaseId,
      cursor: "cursor-one",
      family: "material",
      limit: MAX_HEAD_PAGE_COUNT,
    });
  });

  it("accepts an empty terminal page for an active release without heads", async () => {
    const target = makeTarget(() =>
      Effect.succeed({
        activeManifestHash,
        activeReleaseId,
        cursor: null,
        done: true,
        family: "material",
        heads: [],
        nextCursor: null,
      })
    );

    await expect(collectHeads(target)).resolves.toEqual([]);
  });

  it("rejects a page from a different content family", async () => {
    const target = makeTarget(() =>
      Effect.succeed({
        activeManifestHash,
        activeReleaseId,
        cursor: null,
        done: true,
        family: "article",
        heads: [],
        nextCursor: null,
      })
    );

    await expect(rejectHeads(target)).resolves.toMatchObject({
      _tag: "PublicationTargetProtocolError",
      stage: "heads",
    });
  });

  it("advances across filtered empty pages without losing order evidence", async () => {
    const headPage = vi
      .fn()
      .mockReturnValueOnce(
        Effect.succeed({
          activeManifestHash,
          activeReleaseId,
          cursor: null,
          done: false,
          family: "material",
          heads: [firstHead],
          nextCursor: "cursor-one",
        })
      )
      .mockReturnValueOnce(
        Effect.succeed({
          activeManifestHash,
          activeReleaseId,
          cursor: "cursor-one",
          done: false,
          family: "material",
          heads: [],
          nextCursor: "cursor-two",
        })
      )
      .mockReturnValueOnce(
        Effect.succeed({
          activeManifestHash,
          activeReleaseId,
          cursor: "cursor-two",
          done: true,
          family: "material",
          heads: [secondHead],
          nextCursor: null,
        })
      );

    await expect(collectHeads(makeTarget(headPage))).resolves.toEqual([
      firstHead,
      secondHead,
    ]);
  });

  it("rejects duplicate identities across otherwise valid pages", async () => {
    const headPage = vi
      .fn()
      .mockReturnValueOnce(
        Effect.succeed({
          activeManifestHash,
          activeReleaseId,
          cursor: null,
          done: false,
          family: "material",
          heads: [firstHead],
          nextCursor: "cursor-one",
        })
      )
      .mockReturnValueOnce(
        Effect.succeed({
          activeManifestHash,
          activeReleaseId,
          cursor: "cursor-one",
          done: true,
          family: "material",
          heads: [firstHead],
          nextCursor: null,
        })
      );

    await expect(rejectHeads(makeTarget(headPage))).resolves.toMatchObject({
      _tag: "PublicationTargetProtocolError",
      stage: "heads",
    });
  });

  it("rejects non-terminal pages without a progressing cursor", async () => {
    const headPage = vi
      .fn()
      .mockReturnValueOnce(
        Effect.succeed({
          activeManifestHash,
          activeReleaseId,
          cursor: null,
          done: false,
          family: "material",
          heads: [firstHead],
          nextCursor: "cursor-one",
        })
      )
      .mockReturnValueOnce(
        Effect.succeed({
          activeManifestHash,
          activeReleaseId,
          cursor: "cursor-one",
          done: false,
          family: "material",
          heads: [],
          nextCursor: "cursor-one",
        })
      );

    await expect(rejectHeads(makeTarget(headPage))).resolves.toMatchObject({
      _tag: "PublicationTargetProtocolError",
      stage: "heads",
    });
  });
});
