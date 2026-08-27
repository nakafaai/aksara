import { describe, expect, it } from "@effect/vitest";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { makeExactGitInput } from "@nakafa/aksara-utilities/git/exact";
import {
  ExactProcess,
  ExactProcessError,
  type ExactProcessInput,
} from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import {
  readCleanAksaraRevision,
  readRepositoryEvidence,
  validateStableAksaraRevision,
} from "#cli/evidence";

const COMMIT_SHA = "a".repeat(40);

interface EvidenceResult {
  readonly exitCode?: number;
  readonly stdout?: string | Uint8Array;
}

interface EvidenceOverrides {
  readonly failure?: ExactProcessError;
  readonly sha?: EvidenceResult;
  readonly shas?: readonly EvidenceResult[];
  readonly status?: EvidenceResult;
}

/** Converts one optional evidence value into exact process output bytes. */
function outputBytes(value: string | Uint8Array | undefined) {
  if (typeof value === "string") {
    return new TextEncoder().encode(value);
  }
  return value ?? new Uint8Array();
}

/** Responds independently to exact SHA and dirty-state Git commands. */
function makeEvidenceProcess(
  overrides: EvidenceOverrides = {},
  commands?: ExactProcessInput[]
) {
  let shaRead = 0;
  return ExactProcess.of({
    /** Runs one deterministic Git evidence response. */
    run: (input) => {
      commands?.push(input);
      if (overrides.failure) {
        return Effect.fail(overrides.failure);
      }
      const isSha = input.args.includes("rev-parse");
      const sha = overrides.shas?.[shaRead] ??
        overrides.sha ?? { stdout: `${COMMIT_SHA}\n` };
      if (isSha) {
        shaRead += 1;
      }
      const result = isSha ? sha : (overrides.status ?? { stdout: "" });
      return Effect.succeed({
        exitCode: result.exitCode ?? 0,
        stderr: new Uint8Array(),
        stdout: outputBytes(result.stdout),
      });
    },
  });
}

/** Reads repository evidence through one explicit exact process service. */
function readEvidence(
  overrides?: EvidenceOverrides,
  commands?: ExactProcessInput[]
) {
  return readRepositoryEvidence("aksara", "/code/aksara").pipe(
    Effect.provideService(
      ExactProcess,
      makeEvidenceProcess(overrides, commands)
    )
  );
}

/** Returns the typed evidence error produced by one process scenario. */
function rejectEvidence(overrides: EvidenceOverrides) {
  return readRepositoryEvidence("nakafa", "/code/nakafa.com").pipe(
    Effect.provideService(ExactProcess, makeEvidenceProcess(overrides)),
    Effect.flip
  );
}

describe("repository evidence", () => {
  it.effect("captures exact clean and dirty repository states", () =>
    Effect.gen(function* () {
      const [clean, dirty] = yield* Effect.all(
        [
          readEvidence(),
          readEvidence({
            status: { stdout: " M packages/corpus/real/en.mdx\n" },
          }),
        ],
        { concurrency: "unbounded" }
      );

      expect(clean).toEqual({ dirty: false, sha: COMMIT_SHA });
      expect(dirty).toEqual({ dirty: true, sha: COMMIT_SHA });
    })
  );

  it.effect(
    "uses explicit repository coordinates and the canonical Git policy",
    () =>
      Effect.gen(function* () {
        const commands: ExactProcessInput[] = [];
        yield* readEvidence(undefined, commands);

        expect(commands).toEqual([
          makeExactGitInput({
            args: ["rev-parse", "--verify", "HEAD"],
            root: "/code/aksara",
            stderrLimit: 16 * 1024,
            stdoutLimit: 4 * 1024 * 1024,
          }),
          makeExactGitInput({
            args: ["status", "--porcelain=v1", "--untracked-files=normal"],
            root: "/code/aksara",
            stderrLimit: 16 * 1024,
            stdoutLimit: 4 * 1024 * 1024,
          }),
          makeExactGitInput({
            args: ["rev-parse", "--verify", "HEAD"],
            root: "/code/aksara",
            stderrLimit: 16 * 1024,
            stdoutLimit: 4 * 1024 * 1024,
          }),
        ]);
      })
  );

  it.effect("accepts only a clean exact Aksara release revision", () =>
    Effect.gen(function* () {
      const clean = yield* readCleanAksaraRevision("/code/aksara").pipe(
        Effect.provideService(ExactProcess, makeEvidenceProcess())
      );
      const dirty = yield* readCleanAksaraRevision("/code/aksara").pipe(
        Effect.provideService(
          ExactProcess,
          makeEvidenceProcess({
            status: { stdout: " M real-source.mdx\n" },
          })
        ),
        Effect.flip
      );

      expect(clean).toBe(COMMIT_SHA);
      expect(dirty).toMatchObject({
        _tag: "ReleaseEvidenceError",
        reason: "dirty",
      });
    })
  );

  it.effect("rejects a checkout revision that changes during preparation", () =>
    Effect.gen(function* () {
      const initial = GitCommitShaSchema.make(COMMIT_SHA);
      const changed = GitCommitShaSchema.make("b".repeat(40));

      expect(
        yield* validateStableAksaraRevision(initial, initial)
      ).toBeUndefined();
      expect(
        yield* validateStableAksaraRevision(initial, changed).pipe(Effect.flip)
      ).toMatchObject({
        _tag: "ReleaseRevisionChangedError",
        actual: changed,
        expected: initial,
      });
    })
  );

  it.effect(
    "rejects repository evidence when HEAD moves during status capture",
    () =>
      Effect.gen(function* () {
        const error = yield* rejectEvidence({
          shas: [
            { stdout: `${COMMIT_SHA}\n` },
            { stdout: `${"b".repeat(40)}\n` },
          ],
        });

        expect(error).toMatchObject({
          _tag: "PreviewEvidenceError",
          repository: "nakafa",
          stage: "sha",
        });
      })
  );

  it.effect.each([
    [{ sha: { exitCode: 1, stdout: "" } }, "sha"],
    [{ status: { exitCode: 1, stdout: "" } }, "status"],
    [{ sha: { stdout: "not-a-commit\n" } }, "sha"],
    [{ sha: { stdout: Uint8Array.from([0xc3, 0x28]) } }, "sha"],
    [{ status: { stdout: Uint8Array.from([0xc3, 0x28]) } }, "status"],
  ] as const)(
    "fails closed for invalid Git evidence %#",
    ([overrides, stage]) =>
      Effect.gen(function* () {
        const error = yield* rejectEvidence(overrides);
        expect(error).toMatchObject({
          _tag: "PreviewEvidenceError",
          repository: "nakafa",
          stage,
        });
      })
  );

  it.effect(
    "maps process startup failures without exposing command details",
    () =>
      Effect.gen(function* () {
        const error = yield* readRepositoryEvidence(
          "aksara",
          "/secret/path"
        ).pipe(
          Effect.provideService(
            ExactProcess,
            makeEvidenceProcess({
              failure: new ExactProcessError({ reason: "spawn" }),
            })
          ),
          Effect.flip
        );

        expect(error).toMatchObject({
          _tag: "PreviewEvidenceError",
          repository: "aksara",
        });
        expect(JSON.stringify(error)).not.toContain("secret");
      })
  );
});
