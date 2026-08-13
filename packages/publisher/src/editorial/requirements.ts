import type { EditorialReviewRequirement } from "@nakafa/aksara-contracts/editorial/review";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ActiveAppLocaleList,
  AppLocaleSchema,
  artifactLocaleCode,
  DeliveryLanguageSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  QuestionSourcePathSchema,
  questionKeyParts,
  questionSourcePathParts,
} from "@nakafa/aksara-contracts/question/identity";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import {
  deliveryLanguageForSection,
  ENGLISH_LANGUAGE_SECTION_KEY,
  INDONESIAN_LANGUAGE_SECTION_KEY,
  questionArtifactLocaleForSection,
} from "@nakafa/aksara-contracts/tryout/language";
import { Effect, Schema } from "effect";

/** One content head does not carry a canonical reviewable source identity. */
export class EditorialReviewCoverageIdentityError extends Schema.TaggedError<EditorialReviewCoverageIdentityError>()(
  "EditorialReviewCoverageIdentityError",
  { sourcePath: CorpusSourcePathSchema }
) {}

type EditorialRequirementEffect = Effect.Effect<
  readonly EditorialReviewRequirement[],
  EditorialReviewCoverageIdentityError
>;

/** Derives an app locale from a content artifact without exchanging brands. */
function appLocaleForHead(head: ContentHead) {
  return AppLocaleSchema.make(artifactLocaleCode(head.artifactLocale));
}

/** Binds German authored prose to both reviewed source-locale siblings. */
function authoredSourcePaths(head: ContentHead) {
  if (head.artifactLocale !== "de") {
    return [];
  }
  const localeSuffix = `${head.artifactLocale}.mdx`;
  if (!head.sourcePath.endsWith(localeSuffix)) {
    return null;
  }
  const sourceRoot = head.sourcePath.slice(0, -localeSuffix.length);
  if (!(sourceRoot.endsWith("/") || sourceRoot.endsWith("."))) {
    return null;
  }
  return [
    CorpusSourcePathSchema.make(`${sourceRoot}en.mdx`),
    CorpusSourcePathSchema.make(`${sourceRoot}id.mdx`),
  ];
}

/** Builds the ordinary authored requirement shared by routed bodies and answers. */
function authoredRequirement(head: ContentHead): EditorialRequirementEffect {
  const requiredSourcePaths = authoredSourcePaths(head);
  if (requiredSourcePaths === null) {
    return Effect.fail(
      new EditorialReviewCoverageIdentityError({ sourcePath: head.sourcePath })
    );
  }
  const appLocale = appLocaleForHead(head);
  return Effect.succeed([
    {
      appLocale,
      deliveryLanguage: DeliveryLanguageSchema.make(appLocale),
      expectedTargetHash: head.sourceHash,
      requiredSourcePaths,
      reviewMode: "authored-humanizer-review",
      targetPath: head.sourcePath,
    },
  ]);
}

/** Returns whether one stable section assesses a language verbatim. */
function isAssessedLanguageSection(sectionKey: string) {
  return (
    sectionKey === ENGLISH_LANGUAGE_SECTION_KEY ||
    sectionKey === INDONESIAN_LANGUAGE_SECTION_KEY
  );
}

/** Derives every app-locale policy binding served by one question prompt head. */
function promptRequirements(
  head: ContentHead,
  sectionKey: Parameters<typeof deliveryLanguageForSection>[0],
  activeAppLocales: ActiveAppLocaleList
): EditorialRequirementEffect {
  const authoredSources = authoredSourcePaths(head);
  if (authoredSources === null) {
    return Effect.fail(
      new EditorialReviewCoverageIdentityError({ sourcePath: head.sourcePath })
    );
  }
  const separator = head.sourcePath.lastIndexOf("/");
  const choicesPath = CorpusSourcePathSchema.make(
    `${head.sourcePath.slice(0, separator + 1)}choices.ts`
  );
  const requirements = activeAppLocales.flatMap((appLocale) => {
    const artifactLocale = questionArtifactLocaleForSection(
      sectionKey,
      appLocale
    );
    if (artifactLocale !== head.artifactLocale) {
      return [];
    }
    const assessed = isAssessedLanguageSection(sectionKey);
    return [
      {
        appLocale,
        deliveryLanguage: deliveryLanguageForSection(sectionKey, appLocale),
        expectedTargetHash: head.sourceHash,
        requiredSourcePaths: [
          choicesPath,
          ...(assessed ? [] : authoredSources),
        ],
        reviewMode: assessed
          ? "assessed-language-preserved"
          : "authored-humanizer-review",
        targetPath: head.sourcePath,
      } satisfies EditorialReviewRequirement,
    ];
  });
  if (requirements.length > 0) {
    return Effect.succeed(requirements);
  }
  return Effect.fail(
    new EditorialReviewCoverageIdentityError({ sourcePath: head.sourcePath })
  );
}

/** Derives the exact review bindings required by one current catalog head. */
export function requirementsForHead(
  head: ContentHead,
  activeAppLocales: ActiveAppLocaleList
): EditorialRequirementEffect {
  if (head.family !== "question") {
    return authoredRequirement(head);
  }
  const sourcePath = Schema.decodeUnknownEither(QuestionSourcePathSchema)(
    head.sourcePath
  );
  if (sourcePath._tag === "Left") {
    return Effect.fail(
      new EditorialReviewCoverageIdentityError({ sourcePath: head.sourcePath })
    );
  }
  const source = questionSourcePathParts(sourcePath.right);
  if (source.kind !== "body") {
    return Effect.fail(
      new EditorialReviewCoverageIdentityError({ sourcePath: head.sourcePath })
    );
  }
  if (source.bodyKind === "answer") {
    return authoredRequirement(head);
  }
  const { sectionKey } = questionKeyParts(source.questionKey);
  return promptRequirements(head, sectionKey, activeAppLocales);
}
