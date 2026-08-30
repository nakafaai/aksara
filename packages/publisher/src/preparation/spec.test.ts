import { expect, it } from "@effect/vitest";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { PageKeySchema } from "@nakafa/aksara-contracts/projection/page";
import { Exit, Schema } from "effect";

import { PreparedContentTransitionSchema } from "#publisher/preparation/spec";
import { record as baseTransition } from "#test/publication";

it("rejects predecessor Page metadata in an authored transition", () => {
  const historicalPage = {
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
  };
  const candidate = {
    ...baseTransition,
    record: { ...baseTransition.record, projection: historicalPage },
  };

  expect(
    Exit.isFailure(
      Schema.decodeUnknownExit(PreparedContentTransitionSchema)(candidate, {
        onExcessProperty: "error",
      })
    )
  ).toBe(true);
});
