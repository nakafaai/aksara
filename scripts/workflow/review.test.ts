import { NodeServices } from "@effect/platform-node";
import { assert, describe, expect, it } from "@effect/vitest";
import { ConfigProvider, Effect, FileSystem, Redacted, Result } from "effect";
import {
  HttpClient,
  type HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http";
import {
  decodeQueuePull,
  runQueueReview,
  verifyQueueReviews,
} from "#scripts/workflow/review";

const REPOSITORY = "nakafaai/aksara";
const TOKEN = Redacted.make("github-test-token");
const QUEUE_REF = `refs/heads/gh-readonly-queue/main/pr-272-${"a".repeat(40)}`;

/** Creates one exact merge-group event fixture. */
function queueEvent(headRef = QUEUE_REF, repository = REPOSITORY) {
  return JSON.stringify({
    action: "checks_requested",
    merge_group: { head_ref: headRef },
    repository: { full_name: repository },
  });
}

/** Creates one GitHub review page fixture. */
function reviewPage(
  options: {
    readonly cursor?: string | null;
    readonly errors?: readonly { readonly message: string }[];
    readonly queue?: boolean;
    readonly resolved?: readonly boolean[];
    readonly state?: string;
  } = {}
) {
  return {
    data: {
      repository: {
        pullRequest: {
          mergeQueueEntry: options.queue === false ? null : { id: "entry" },
          reviewThreads: {
            nodes: (options.resolved ?? []).map((isResolved) => ({
              isResolved,
            })),
            pageInfo: {
              endCursor: options.cursor ?? null,
              hasNextPage: options.cursor !== undefined,
            },
          },
          state: options.state ?? "OPEN",
        },
      },
    },
    ...(options.errors === undefined ? {} : { errors: options.errors }),
  };
}

/** Builds a deterministic GitHub client from ordered response bodies. */
function reviewClient(
  responses: readonly {
    readonly body: unknown;
    readonly status?: number;
  }[]
) {
  const requests: HttpClientRequest.HttpClientRequest[] = [];
  let index = 0;
  return {
    client: HttpClient.make((request) => {
      requests.push(request);
      const response = responses[index];
      index += 1;
      assert(response !== undefined, "Expected one GitHub response fixture.");
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(response.body), {
            headers: { "content-type": "application/json" },
            status: response.status ?? 200,
          })
        )
      );
    }),
    requests,
  };
}

/** Decodes the exact JSON bytes written to one GitHub request. */
function requestJson(request: HttpClientRequest.HttpClientRequest) {
  assert(request.body._tag === "Uint8Array", "Expected one JSON request.");
  const parsed: unknown = JSON.parse(
    Buffer.from(request.body.body).toString("utf8")
  );
  return parsed;
}

/** Runs review verification against one injected GitHub client. */
function verify(
  client: HttpClient.HttpClient,
  source = queueEvent(),
  repository = REPOSITORY
) {
  return verifyQueueReviews(source, { repository, token: TOKEN }).pipe(
    Effect.provideService(HttpClient.HttpClient, client)
  );
}

describe("merge queue review gate", () => {
  it.effect("checks every review page on the current queue entry", () =>
    Effect.gen(function* () {
      const captured = reviewClient([
        { body: reviewPage({ cursor: "next", resolved: [true, true] }) },
        { body: reviewPage({ resolved: [true] }) },
      ]);
      expect(yield* verify(captured.client)).toBe(3);
      expect(captured.requests).toHaveLength(2);
      expect(captured.requests[0]).toMatchObject({
        method: "POST",
        url: "https://api.github.com/graphql",
      });
      expect(captured.requests[0]?.headers).toMatchObject({
        accept: "application/vnd.github+json",
        authorization: "Bearer github-test-token",
      });
      const [firstRequest, secondRequest] = captured.requests;
      assert(firstRequest !== undefined, "Expected the first GitHub request.");
      assert(secondRequest !== undefined, "Expected the second request.");
      const firstBody = requestJson(firstRequest);
      const secondBody = requestJson(secondRequest);
      expect(firstBody).toMatchObject({
        variables: {
          cursor: null,
          number: 272,
          owner: "nakafaai",
          repo: "aksara",
        },
      });
      expect(secondBody).toMatchObject({ variables: { cursor: "next" } });
    })
  );

  it.effect("rejects invalid event and repository identities", () =>
    Effect.gen(function* () {
      const { client } = reviewClient([]);
      const cases = [
        ["not-json", "Merge queue event is invalid."],
        [
          queueEvent(QUEUE_REF, "other/aksara"),
          "Merge queue repository does not match.",
        ],
        [queueEvent("refs/heads/main"), "Merge queue ref is invalid."],
      ] as const;
      for (const [source, message] of cases) {
        const result = yield* decodeQueuePull(source, REPOSITORY).pipe(
          Effect.result
        );
        assert(Result.isFailure(result));
        expect(result.failure.message).toBe(message);
      }
      const repository = yield* verify(
        client,
        queueEvent(QUEUE_REF, "invalid"),
        "invalid"
      ).pipe(Effect.result);
      assert(Result.isFailure(repository));
      expect(repository.failure.message).toBe(
        "GitHub repository identity is invalid."
      );
    })
  );

  it.effect("fails closed for unsafe current pull request state", () =>
    Effect.gen(function* () {
      const cases = [
        [
          reviewPage({ resolved: [false] }),
          "Queued pull request has an unresolved review thread.",
        ],
        [
          reviewPage({ queue: false }),
          "Pull request is no longer an open merge queue entry.",
        ],
        [
          reviewPage({ state: "MERGED" }),
          "Pull request is no longer an open merge queue entry.",
        ],
        [
          { data: { repository: null } },
          "Queued pull request no longer exists.",
        ],
        [
          { data: { repository: { pullRequest: null } } },
          "Queued pull request no longer exists.",
        ],
        [
          reviewPage({ errors: [{ message: "denied" }] }),
          "GitHub review query failed: denied.",
        ],
        [reviewPage({ errors: [] }), null],
      ] as const;
      for (const [body, message] of cases) {
        const result = yield* verify(reviewClient([{ body }]).client).pipe(
          Effect.result
        );
        if (message === null) {
          assert(Result.isSuccess(result));
          expect(result.success).toBe(0);
        } else {
          assert(Result.isFailure(result));
          expect(result.failure.message).toBe(message);
        }
      }
    })
  );

  it.effect(
    "rejects stalled pagination and malformed transport responses",
    () =>
      Effect.gen(function* () {
        const missing = reviewClient([
          { body: reviewPage({ cursor: null }) },
        ]).client;
        const repeated = reviewClient([
          { body: reviewPage({ cursor: "same" }) },
          { body: reviewPage({ cursor: "same" }) },
        ]).client;
        for (const client of [missing, repeated]) {
          const result = yield* verify(client).pipe(Effect.result);
          assert(Result.isFailure(result));
          expect(result.failure.message).toBe(
            "GitHub review pagination did not advance."
          );
        }
        const status = yield* verify(
          reviewClient([{ body: {}, status: 500 }]).client
        ).pipe(Effect.result);
        const schema = yield* verify(
          reviewClient([{ body: { unexpected: true } }]).client
        ).pipe(Effect.result);
        for (const result of [status, schema]) {
          assert(Result.isFailure(result));
          expect(result.failure.message).toBe(
            "Unable to read pull request review threads."
          );
        }
      })
  );

  it.effect("runs from exact CI configuration and event bytes", () =>
    Effect.gen(function* () {
      const service = yield* FileSystem.FileSystem;
      const root = yield* service.makeTempDirectoryScoped();
      const eventPath = `${root}/event.json`;
      yield* service.writeFileString(eventPath, queueEvent());
      const provider = ConfigProvider.fromUnknown({
        GITHUB_EVENT_PATH: eventPath,
        GITHUB_REPOSITORY: REPOSITORY,
        GITHUB_TOKEN: "github-test-token",
      });
      const result = yield* runQueueReview().pipe(
        Effect.provideService(ConfigProvider.ConfigProvider, provider),
        Effect.provideService(
          HttpClient.HttpClient,
          reviewClient([{ body: reviewPage({ resolved: [true] }) }]).client
        )
      );
      expect(result).toBe(1);
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("reports unavailable CI configuration and event files", () =>
    Effect.gen(function* () {
      const missingConfig = yield* runQueueReview().pipe(
        Effect.provideService(
          ConfigProvider.ConfigProvider,
          ConfigProvider.fromUnknown({})
        ),
        Effect.result
      );
      assert(Result.isFailure(missingConfig));
      expect(missingConfig.failure.message).toBe(
        "Review gate environment is invalid."
      );
      const missingFile = yield* runQueueReview().pipe(
        Effect.provideService(
          ConfigProvider.ConfigProvider,
          ConfigProvider.fromUnknown({
            GITHUB_EVENT_PATH: "/missing/event.json",
            GITHUB_REPOSITORY: REPOSITORY,
            GITHUB_TOKEN: "github-test-token",
          })
        ),
        Effect.result
      );
      assert(Result.isFailure(missingFile));
      expect(missingFile.failure.message).toBe(
        "Unable to read merge queue event."
      );
    }).pipe(
      Effect.provide(NodeServices.layer),
      Effect.provideService(HttpClient.HttpClient, reviewClient([]).client)
    )
  );
});
