import { writeFileSync } from "node:fs";
import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect, Redacted } from "effect";

import { makeNakafaAppError } from "#cli/app-error";
import type { RunningNakafa } from "#cli/child/session";
import type { NakafaApp } from "#cli/nakafa";
import {
  makeRepositoryTracker,
  REAL_SOURCE,
  RENDERER_MANIFEST,
} from "#test/real";
import { makeApp, runLocal } from "#test/session";

const repositories = makeRepositoryTracker();

afterEach(() => repositories.clear());

layer(NodeServices.layer)("local preview session", (it) => {
  it.effect(
    "opens the real selected corpus and recompiles without a child restart",
    () =>
      Effect.gen(function* () {
        const repository = yield* Effect.sync(repositories.create);
        const capture: {
          input?: Parameters<typeof NakafaApp.Service.start>[0];
        } = {};
        yield* runLocal(
          repository,
          makeApp(capture),
          () => {
            expect(capture.input?.provider.origin.hostname).toBe("127.0.0.1");
            return Effect.void;
          },
          AppLocaleSchema.make("en")
        );
      })
  );

  it.effect("keeps a changed route failed when initial compilation fails", () =>
    Effect.gen(function* () {
      const repository = yield* Effect.sync(repositories.create);
      yield* Effect.sync(() =>
        writeFileSync(
          repository.documentPath,
          `${REAL_SOURCE}\n\n{process.env}\n`
        )
      );
      const capture: {
        input?: Parameters<typeof NakafaApp.Service.start>[0];
      } = {};
      yield* runLocal(repository, makeApp(capture), () =>
        Effect.gen(function* () {
          const { input } = capture;
          if (!input) {
            return yield* Effect.die(
              "The test Nakafa app did not receive preview input."
            );
          }
          const response = yield* Effect.tryPromise(() =>
            fetch(new URL(input.provider.manifestPath, input.provider.origin), {
              headers: {
                authorization: `Bearer ${Redacted.value(input.credentials.providerToken)}`,
              },
            })
          );
          const body = yield* Effect.tryPromise(() => response.json());
          expect(body).toMatchObject({ status: "failed" });
        })
      );
    })
  );

  it.effect(
    "stops if the actual Nakafa child exits before renderer discovery",
    () =>
      Effect.gen(function* () {
        const repository = yield* Effect.sync(repositories.create);
        const child: RunningNakafa = {
          awaitExit: Effect.fail(makeNakafaAppError("exit", false, 1)),
          origin: new URL("http://localhost:31234"),
        };
        const error = yield* runLocal(
          repository,
          makeApp(
            {},
            child,
            Effect.sleep("20 millis").pipe(Effect.as(RENDERER_MANIFEST))
          ),
          () => Effect.void
        ).pipe(Effect.flip);

        expect(String(error)).toContain("NakafaAppError");
      })
  );
});
