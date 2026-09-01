import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import type { QuestionAuditEvidence } from "@nakafa/aksara-publisher/audit/question";
import { auditQuestionRelease } from "@nakafa/aksara-publisher/audit/question";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import type { FileSystem, Path } from "effect";
import { Effect } from "effect";
import type { HttpClient } from "effect/unstable/http";
import { readPublicationEnvironment } from "#cli/environment/read";
import { mapProductionError, type ProductionError } from "#cli/failure";
import type { AuditArguments } from "#cli/production/arguments";
import { PUBLICATION_TARGET_TIMEOUT, retryPublicationTarget } from "#cli/retry";

type AuditCommand = Effect.Effect<
  QuestionAuditEvidence,
  ProductionError,
  FileSystem.FileSystem | HttpClient.HttpClient | Path.Path
>;

/** Authenticates a full Question rebuild and emits only bounded evidence. */
export const runAuditCommand: (args: AuditArguments) => AuditCommand =
  Effect.fn("AksaraCli.runAuditCommand")((args) =>
    Effect.gen(function* () {
      const environment = yield* readPublicationEnvironment().pipe(
        Effect.mapError(mapProductionError("environment"))
      );
      const rawTarget = yield* makeHttpPublicationTarget({
        allowInsecureLoopback: false,
        endpoint: environment.publicationEndpoint,
        timeout: PUBLICATION_TARGET_TIMEOUT,
        token: environment.publicationToken,
      }).pipe(Effect.mapError(mapProductionError("target")));
      const evidence = yield* auditQuestionRelease(args).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS)
        ),
        Effect.provideService(
          PublicationTarget,
          retryPublicationTarget(rawTarget)
        ),
        Effect.mapError(mapProductionError("audit"))
      );
      return yield* Effect.logInfo("Question publication audit passed.").pipe(
        Effect.annotateLogs(evidence),
        Effect.as(evidence)
      );
    }).pipe(Effect.scoped)
  );
