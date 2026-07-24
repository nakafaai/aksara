import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  PreviewDocumentSchema,
  previewDocumentRoute,
  QuestionAnswerPreviewDocumentSchema,
  QuestionPromptPreviewDocumentSchema,
} from "#contracts/preview/document";
import {
  testAnswerDocument,
  testArticleDocument,
  testMaterialDocument,
  testPromptDocument,
} from "#contracts/test/preview";

/** Reports whether strict preview document decoding rejects one candidate. */
function rejectsDocument(candidate: unknown) {
  return Either.isLeft(
    Schema.decodeUnknownEither(PreviewDocumentSchema, {
      onExcessProperty: "error",
    })(candidate)
  );
}

describe("preview document", () => {
  it("decodes all four exact discriminated document variants", () => {
    const documents = [
      testArticleDocument,
      testMaterialDocument,
      testPromptDocument,
      testAnswerDocument,
    ];

    expect(
      documents.map((document) =>
        Schema.decodeUnknownSync(PreviewDocumentSchema)(document)
      )
    ).toEqual(documents);
    expect(
      documents.map(({ delivery, family }) => ({ delivery, family }))
    ).toEqual([
      { delivery: "public", family: "article" },
      { delivery: "public", family: "material" },
      { delivery: "authenticated", family: "question" },
      { delivery: "entitled", family: "question" },
    ]);
  });

  it("derives the actual article, material, and try-out routes", () => {
    expect(
      [
        testArticleDocument,
        testMaterialDocument,
        testPromptDocument,
        testAnswerDocument,
      ].map(previewDocumentRoute)
    ).toEqual([
      {
        locale: testArticleDocument.route.locale,
        publicPath: testArticleDocument.route.publicPath,
      },
      {
        locale: testMaterialDocument.route.locale,
        publicPath: testMaterialDocument.route.publicPath,
      },
      {
        locale: testPromptDocument.target.section.locale,
        publicPath: testPromptDocument.target.section.publicPath,
      },
      {
        locale: testAnswerDocument.target.section.locale,
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
        identity: { ...testPromptDocument.identity, locale: "id" },
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
        Either.isLeft(
          Schema.decodeUnknownEither(QuestionPromptPreviewDocumentSchema)(
            candidate
          )
        )
      ).toBe(true);
    }
    expect(
      String(
        Schema.decodeUnknownEither(QuestionPromptPreviewDocumentSchema)(
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
    const result = Schema.decodeUnknownEither(
      QuestionAnswerPreviewDocumentSchema
    )(invalid);

    expect(Either.isLeft(result)).toBe(true);
    expect(String(result)).toContain(
      "Expected question answer identity, placement, and source to agree."
    );
  });

  it("rejects wrong delivery and invented question fields", () => {
    expect(
      [
        { ...testArticleDocument, delivery: "authenticated" },
        { ...testMaterialDocument, family: "article" },
        { ...testPromptDocument, delivery: "entitled" },
        { ...testAnswerDocument, delivery: "authenticated" },
        { ...testPromptDocument, questionLanguage: "en" },
      ].every(rejectsDocument)
    ).toBe(true);
  });
});
