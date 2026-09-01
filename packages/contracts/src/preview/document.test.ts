import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  PreviewDocumentSchema,
  previewDocumentRoute,
  QuestionAnswerPreviewDocumentSchema,
  QuestionPromptPreviewDocumentSchema,
} from "#contracts/preview/document";
import {
  testArticleDocument,
  testMaterialDocument,
  testPageDocument,
} from "#contracts/test/preview";
import {
  testAnswerDocument,
  testPromptDocument,
} from "#contracts/test/preview-question";

/** Reports whether strict preview document decoding rejects one candidate. */
function rejectsDocument(candidate: unknown) {
  return Exit.isFailure(
    Schema.decodeUnknownExit(PreviewDocumentSchema, {
      onExcessProperty: "error",
    })(candidate)
  );
}

describe("preview document", () => {
  it("decodes all five exact discriminated document variants", () => {
    const documents = [
      testArticleDocument,
      testMaterialDocument,
      testPageDocument,
      testPromptDocument,
      testAnswerDocument,
    ];

    expect(
      documents.map((document) =>
        Schema.decodeSync(PreviewDocumentSchema)(document)
      )
    ).toEqual(documents);
    expect(
      documents.map(({ delivery, family }) => ({ delivery, family }))
    ).toEqual([
      { delivery: "public", family: "article" },
      { delivery: "public", family: "material" },
      { delivery: "public", family: "page" },
      { delivery: "authenticated", family: "question" },
      { delivery: "entitled", family: "question" },
    ]);
  });

  it("derives the actual article, material, page, and try-out routes", () => {
    expect(
      [
        testArticleDocument,
        testMaterialDocument,
        testPageDocument,
        testPromptDocument,
        testAnswerDocument,
      ].map(previewDocumentRoute)
    ).toEqual([
      {
        appLocale: testArticleDocument.route.appLocale,
        publicPath: testArticleDocument.route.publicPath,
      },
      {
        appLocale: testMaterialDocument.route.appLocale,
        publicPath: testMaterialDocument.route.publicPath,
      },
      {
        appLocale: testPageDocument.route.appLocale,
        publicPath: testPageDocument.route.publicPath,
      },
      {
        appLocale: testPromptDocument.target.section.appLocale,
        publicPath: testPromptDocument.target.section.publicPath,
      },
      {
        appLocale: testAnswerDocument.target.section.appLocale,
        publicPath: testAnswerDocument.target.section.publicPath,
      },
    ]);
  });

  it("rejects prompt identity, locale, renderer, and source drift", () => {
    const secondQuestion = {
      ...testPromptDocument.identity,
      contentKey: testPromptDocument.identity.contentKey.replace(
        "question-1",
        "question-2"
      ),
      peerContentKey: testPromptDocument.identity.peerContentKey.replace(
        "question-1",
        "question-2"
      ),
      questionKey: testPromptDocument.identity.questionKey.replace(
        "question-1",
        "question-2"
      ),
      questionNumber: 2,
    };
    const invalid = [
      { ...testPromptDocument, identity: secondQuestion },
      {
        ...testPromptDocument,
        identity: {
          ...testPromptDocument.identity,
          artifactLocale: "id",
        },
        sourcePath: testPromptDocument.sourcePath.replace(".en.", ".id."),
      },
      { ...testPromptDocument, rendererDomain: "snbt-math" },
      {
        ...testPromptDocument,
        sourcePath: testPromptDocument.sourcePath.replace(
          "question.en.mdx",
          "answer.en.mdx"
        ),
      },
    ];

    for (const candidate of invalid) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionPromptPreviewDocumentSchema)(
            candidate
          )
        )
      ).toBe(true);
    }
    expect(
      String(
        Schema.decodeUnknownExit(QuestionPromptPreviewDocumentSchema)(
          invalid[0]
        )
      )
    ).toContain(
      "Expected question prompt identity, placement, and source to agree."
    );
  });

  it("rejects answer identity and placement drift", () => {
    const secondQuestion = {
      ...testAnswerDocument.identity,
      contentKey: testAnswerDocument.identity.contentKey.replace(
        "question-1",
        "question-2"
      ),
      peerContentKey: testAnswerDocument.identity.peerContentKey.replace(
        "question-1",
        "question-2"
      ),
      questionKey: testAnswerDocument.identity.questionKey.replace(
        "question-1",
        "question-2"
      ),
      questionNumber: 2,
    };

    const invalid = { ...testAnswerDocument, identity: secondQuestion };
    const result = Schema.decodeExit(QuestionAnswerPreviewDocumentSchema)(
      invalid
    );

    expect(Exit.isFailure(result)).toBe(true);
    expect(String(result)).toContain(
      "Expected question answer identity, placement, and source to agree."
    );
  });

  it("rejects wrong delivery and invented question fields", () => {
    expect(
      [
        { ...testArticleDocument, delivery: "authenticated" },
        { ...testMaterialDocument, family: "article" },
        { ...testPageDocument, rendererDomain: "politics" },
        { ...testPromptDocument, delivery: "entitled" },
        { ...testAnswerDocument, delivery: "authenticated" },
        { ...testPromptDocument, questionLanguage: "en" },
      ].every(rejectsDocument)
    ).toBe(true);
  });
});
