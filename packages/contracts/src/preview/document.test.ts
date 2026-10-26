import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";
import {
  PreviewDocumentSchema,
  previewDocumentRoute,
} from "#contracts/preview/document";
import {
  testArticleDocument,
  testMaterialDocument,
  testPageDocument,
} from "#contracts/test/preview/documents";

/** Reports whether strict preview document decoding rejects one candidate. */
function rejectsDocument(candidate: unknown) {
  return Exit.isFailure(
    Schema.decodeUnknownExit(PreviewDocumentSchema, {
      onExcessProperty: "error",
    })(candidate)
  );
}

const documents = [testArticleDocument, testMaterialDocument, testPageDocument];

describe("preview document", () => {
  it("decodes the three exact public document variants", () => {
    expect(
      Arr.map(documents, (document) =>
        Schema.decodeSync(PreviewDocumentSchema)(document)
      )
    ).toEqual(documents);
  });

  it("derives the actual article, material, and page routes", () => {
    expect(Arr.map(documents, previewDocumentRoute)).toEqual(
      Arr.map(documents, ({ route }) => ({
        appLocale: route.appLocale,
        publicPath: route.publicPath,
      }))
    );
  });

  it("rejects a private delivery, a crossed family, and a foreign renderer", () => {
    expect(
      Arr.every(
        [
          { ...testArticleDocument, delivery: "authenticated" },
          { ...testMaterialDocument, family: "article" },
          { ...testPageDocument, rendererDomain: "politics" },
        ],
        rejectsDocument
      )
    ).toBe(true);
  });
});
