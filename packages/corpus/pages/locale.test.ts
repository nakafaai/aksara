import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import { PageKeySchema } from "@nakafa/aksara-contracts/projection/page";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import {
  composePageLocaleSource,
  decodePageLocaleCatalog,
  requirePageLocaleSource,
  validatePageLocaleCatalog,
} from "#corpus/pages/locale";
import { decodePageSources } from "#corpus/pages/source";
import { germanPageSource, pageSource } from "#corpus/test/page";

/** Resolves one representative active page through its real source decoder. */
async function activePage() {
  const [source] = await Effect.runPromise(decodePageSources([pageSource()]));
  if (source === undefined) {
    throw new Error("Expected one decoded public page source.");
  }
  return source;
}

describe("candidate public page routes", () => {
  it("decodes the permanent catalog and composes exact German ownership", async () => {
    const active = await activePage();
    const catalog = await Effect.runPromise(
      decodePageLocaleCatalog([germanPageSource()])
    );
    const composed = await Effect.runPromise(
      requirePageLocaleSource(active, catalog, "de")
    );

    expect(composed).toMatchObject({
      overlayAppLocale: "de",
      publicPaths: { de: "privacy-policy" },
    });
    await expect(
      Effect.runPromise(decodePageLocaleCatalog())
    ).resolves.toHaveLength(3);
  });

  it("maps malformed and unavailable catalogs to typed failures", async () => {
    const active = await activePage();
    const malformed = await Effect.runPromise(
      decodePageLocaleCatalog(null).pipe(Effect.flip)
    );
    const unavailable = await Effect.runPromise(
      requirePageLocaleSource(active, [], "de").pipe(Effect.flip)
    );
    const duplicate = await Effect.runPromise(
      requirePageLocaleSource(
        active,
        await Effect.runPromise(
          decodePageLocaleCatalog([germanPageSource(), germanPageSource()])
        ),
        "de"
      ).pipe(Effect.flip)
    );
    const foreign = await Effect.runPromise(
      composePageLocaleSource(active, {
        appLocale: "de",
        pageKey: PageKeySchema.make("security-policy"),
        publicPath: PublicPathSchema.make("security-policy"),
      }).pipe(Effect.flip)
    );

    expect(malformed._tag).toBe("PageLocaleCatalogError");
    expect([unavailable, duplicate, foreign]).toEqual([
      expect.objectContaining({ reason: "unavailable" }),
      expect.objectContaining({ reason: "unavailable" }),
      expect.objectContaining({ reason: "orphan" }),
    ]);
  });

  it("rejects duplicate and orphan rows before locale projection", async () => {
    const active = await activePage();
    const valid = await Effect.runPromise(
      decodePageLocaleCatalog([germanPageSource()])
    );
    const duplicate = await Effect.runPromise(
      validatePageLocaleCatalog([active], [...valid, ...valid]).pipe(
        Effect.flip
      )
    );
    const orphan = await Effect.runPromise(
      validatePageLocaleCatalog([], valid).pipe(Effect.flip)
    );

    expect(duplicate).toMatchObject({
      _tag: "PageLocaleOwnershipError",
      reason: "duplicate",
    });
    expect(orphan).toMatchObject({
      _tag: "PageLocaleOwnershipError",
      reason: "orphan",
    });
    await expect(
      Effect.runPromise(validatePageLocaleCatalog([active], valid))
    ).resolves.toEqual(valid);
  });
});
