import { beforeEach, expect, it, vi } from "vitest";
import { publishMaterialRelease } from "#test/material/run";
import { publicationRequirements } from "#test/requirements";

const compilerState = vi.hoisted(() => ({ calls: 0 }));

vi.mock("@nakafa/aksara-compiler/compile", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@nakafa/aksara-compiler/compile")>();
  return {
    ...original,
    compileContent: (input: unknown) => {
      compilerState.calls += 1;
      return original.compileContent(input);
    },
  };
});

beforeEach(() => {
  compilerState.calls = 0;
});

it("requires exact Git source context only for Git publication", async () => {
  const requirements = await publicationRequirements();
  expect(requirements).toEqual({ git: true, rollback: false });
});

it("compiles each source once per required reproducibility boundary", async () => {
  const result = await publishMaterialRelease();
  expect(compilerState.calls).toBe(4);
  expect(result.receipt).toMatchObject({
    activatedHeads: 2,
    stagedArtifacts: 2,
    stagedItems: 2,
    stagedProjections: 2,
  });
  expect(result.stageArtifacts).toHaveBeenCalledTimes(1);
});
