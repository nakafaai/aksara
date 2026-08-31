import { NodeRuntime, NodeServices } from "@effect/platform-node";
import {
  Config,
  Effect,
  FileSystem,
  Layer,
  type Redacted,
  Schema,
} from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const QUEUE_REF =
  /^refs\/heads\/gh-readonly-queue\/main\/pr-([1-9][0-9]*)-[0-9a-f]{40}$/u;

const QueueEventSchema = Schema.Struct({
  action: Schema.Literal("checks_requested"),
  merge_group: Schema.Struct({ head_ref: Schema.String }),
  repository: Schema.Struct({ full_name: Schema.String }),
});

const ReviewPageSchema = Schema.Struct({
  data: Schema.Struct({
    repository: Schema.NullOr(
      Schema.Struct({
        pullRequest: Schema.NullOr(
          Schema.Struct({
            mergeQueueEntry: Schema.NullOr(
              Schema.Struct({ id: Schema.String })
            ),
            reviewThreads: Schema.Struct({
              nodes: Schema.Array(
                Schema.Struct({ isResolved: Schema.Boolean })
              ),
              pageInfo: Schema.Struct({
                endCursor: Schema.NullOr(Schema.String),
                hasNextPage: Schema.Boolean,
              }),
            }),
            state: Schema.String,
          })
        ),
      })
    ),
  }),
  errors: Schema.optional(
    Schema.Array(Schema.Struct({ message: Schema.String }))
  ),
});

type ReviewPage = typeof ReviewPageSchema.Type;

/** The merge queue review state could not be proven safe. */
export class QueueReviewError extends Schema.TaggedError<QueueReviewError>()(
  "QueueReviewError",
  { message: Schema.String }
) {}

interface ReviewContext {
  readonly repository: string;
  readonly token: Redacted.Redacted;
}

const REVIEW_QUERY = `
  query QueueReview($owner: String!, $repo: String!, $number: Int!, $cursor: String) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $number) {
        mergeQueueEntry { id }
        reviewThreads(first: 100, after: $cursor) {
          nodes { isResolved }
          pageInfo { endCursor hasNextPage }
        }
        state
      }
    }
  }
`;

/** Creates one typed failure for the final merge queue review gate. */
const queueReviewError = (message: string) => new QueueReviewError({ message });

/** Decodes the exact pull request represented by one merge-group event. */
export const decodeQueuePull = Effect.fn("AksaraQueue.decodePull")(function* (
  source: string,
  repository: string
) {
  const event = yield* Schema.decodeEffect(
    Schema.fromJsonString(QueueEventSchema)
  )(source).pipe(
    Effect.mapError(() => queueReviewError("Merge queue event is invalid."))
  );
  if (event.repository.full_name !== repository) {
    return yield* queueReviewError("Merge queue repository does not match.");
  }
  const match = QUEUE_REF.exec(event.merge_group.head_ref);
  const pullNumber = Number(match?.[1]);
  if (!Number.isSafeInteger(pullNumber) || pullNumber <= 0) {
    return yield* queueReviewError("Merge queue ref is invalid.");
  }
  return pullNumber;
});

/** Reads one bounded page of current review threads from GitHub. */
const readReviewPage = Effect.fn("AksaraQueue.readReviews")(function* (
  context: ReviewContext,
  pullNumber: number,
  cursor: string | null
) {
  const [owner, repo, ...unexpected] = context.repository.split("/");
  if (!(owner && repo) || unexpected.length > 0) {
    return yield* queueReviewError("GitHub repository identity is invalid.");
  }
  const request = HttpClientRequest.post(GITHUB_GRAPHQL).pipe(
    HttpClientRequest.setHeaders({
      Accept: "application/vnd.github+json",
      "User-Agent": "aksara-merge-queue-review",
      "X-GitHub-Api-Version": "2022-11-28",
    }),
    HttpClientRequest.bearerToken(context.token),
    HttpClientRequest.bodyJsonUnsafe({
      query: REVIEW_QUERY,
      variables: { cursor, number: pullNumber, owner, repo },
    })
  );
  const client = yield* HttpClient.HttpClient;
  return yield* client.execute(request).pipe(
    Effect.flatMap(HttpClientResponse.filterStatusOk),
    Effect.flatMap(HttpClientResponse.schemaBodyJson(ReviewPageSchema)),
    Effect.mapError(() =>
      queueReviewError("Unable to read pull request review threads.")
    )
  );
});

/** Fails unless every current thread on the queued pull request is resolved. */
export const verifyQueueReviews = Effect.fn("AksaraQueue.verifyReviews")(
  function* (source: string, context: ReviewContext) {
    const pullNumber = yield* decodeQueuePull(source, context.repository);
    const seen = new Set<string>();
    let cursor: string | null = null;
    let threadCount = 0;
    for (;;) {
      const response: ReviewPage = yield* readReviewPage(
        context,
        pullNumber,
        cursor
      );
      const [queryError] = response.errors ?? [];
      if (queryError) {
        return yield* queueReviewError(
          `GitHub review query failed: ${queryError.message}.`
        );
      }
      const pull = response.data.repository?.pullRequest;
      if (!pull) {
        return yield* queueReviewError("Queued pull request no longer exists.");
      }
      if (pull.state !== "OPEN" || pull.mergeQueueEntry === null) {
        return yield* queueReviewError(
          "Pull request is no longer an open merge queue entry."
        );
      }
      const threads = pull.reviewThreads.nodes;
      threadCount += threads.length;
      if (threads.some((thread) => !thread.isResolved)) {
        return yield* queueReviewError(
          "Queued pull request has an unresolved review thread."
        );
      }
      if (!pull.reviewThreads.pageInfo.hasNextPage) {
        yield* Effect.log(
          `Verified ${threadCount} review threads on queued pull request #${pullNumber}.`
        );
        return threadCount;
      }
      const next = pull.reviewThreads.pageInfo.endCursor;
      if (!(next && !seen.has(next))) {
        return yield* queueReviewError(
          "GitHub review pagination did not advance."
        );
      }
      seen.add(next);
      cursor = next;
    }
  }
);

/** Reads CI configuration and verifies the final queued review state. */
export const runQueueReview = Effect.fn("AksaraQueue.runReview")(function* () {
  const config = yield* Config.all({
    eventPath: Config.nonEmptyString("GITHUB_EVENT_PATH"),
    repository: Config.nonEmptyString("GITHUB_REPOSITORY"),
    token: Config.redacted("GITHUB_TOKEN"),
  }).pipe(
    Effect.mapError(() =>
      queueReviewError("Review gate environment is invalid.")
    )
  );
  const fileSystem = yield* FileSystem.FileSystem;
  const source = yield* fileSystem
    .readFileString(config.eventPath)
    .pipe(
      Effect.mapError(() =>
        queueReviewError("Unable to read merge queue event.")
      )
    );
  return yield* verifyQueueReviews(source, {
    repository: config.repository,
    token: config.token,
  });
});

/* istanbul ignore next -- CI executes the bundled Node entrypoint. */
if (import.meta.main) {
  NodeRuntime.runMain(
    runQueueReview().pipe(
      Effect.provide(Layer.mergeAll(NodeServices.layer, FetchHttpClient.layer))
    )
  );
}
