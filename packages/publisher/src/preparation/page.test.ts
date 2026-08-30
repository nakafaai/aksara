import { expect, it } from "@effect/vitest";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { PageKeySchema } from "@nakafa/aksara-contracts/projection/page";
import { Effect, Stream } from "effect";

import { derivePreparedRecords } from "#publisher/preparation/stream";
import { record as baseTransition } from "#test/publication";

const releaseId = ReleaseIdSchema.make("test-page-preparation");

it.effect("rejects predecessor Page metadata in an authored upsert", () =>
  Effect.gen(function* () {
    const candidate = {
      ...baseTransition.record,
      projection: {
        appLocale: AppLocaleSchema.make("en"),
        artifactLocale: ArtifactLocaleSchema.make("en"),
        contentKey: ContentKeySchema.make("pages/test"),
        kind: "public-page",
        metadata: {
          description: "Test page.",
          lastModified: "2026-01-01",
          title: "Test",
        },
        pageKey: PageKeySchema.make("test"),
        publicPath: PublicPathSchema.make("test"),
        sitemap: true,
        sourcePath: CorpusSourcePathSchema.make(
          "packages/corpus/pages/test/en.mdx"
        ),
      },
    };
    const error = yield* derivePreparedRecords({
      records: Stream.make({ ...baseTransition, record: candidate }),
      releaseId,
    }).pipe(Stream.runCollect, Effect.flip);

    expect(error).toMatchObject({ _tag: "PreparedContentDecodeError" });
  })
);
