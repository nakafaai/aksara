import {
  APP_LOCALE_CODES,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";

import {
  localizedSourceMapSchema,
  mapLocalizedSource,
  requireSourceLocale,
  traverseLocalizedSources,
} from "#corpus/locale/source";

const CopySchema = localizedSourceMapSchema(
  Schema.Trimmed.check(Schema.isNonEmpty())
);

describe("localized source maps", () => {
  it("admits complete and partial copy for contract-supported locales", () => {
    expect(
      Schema.decodeSync(CopySchema)({
        de: "Deutsch",
        en: "English",
        id: "Indonesia",
      })
    ).toEqual({ de: "Deutsch", en: "English", id: "Indonesia" });
    expect(Schema.decodeSync(CopySchema)({ en: "English" })).toEqual({
      en: "English",
    });
    expect(Schema.decodeSync(CopySchema)({})).toEqual({});
    expect(() =>
      Schema.decodeUnknownSync(CopySchema)(
        { en: "English", fr: "Français", id: "Indonesia" },
        { onExcessProperty: "error" }
      )
    ).toThrow();
  });

  it("fails typed when requested copy is absent", async () => {
    const source = Schema.decodeSync(CopySchema)({
      en: "English",
      id: "Indonesia",
    });
    await expect(
      Effect.runPromise(
        requireSourceLocale(source, AppLocaleSchema.make("de"), "example").pipe(
          Effect.flip
        )
      )
    ).resolves.toMatchObject({
      _tag: "SourceLocaleUnavailableError",
      appLocale: "de",
      owner: "example",
    });
  });

  it("maps and traverses every present copy in canonical order", async () => {
    const source = Schema.decodeSync(CopySchema)({
      de: "Deutsch",
      en: "English",
      id: "Indonesia",
    });
    expect(
      mapLocalizedSource(source, (value, locale) => `${locale}:${value}`)
    ).toEqual({
      de: "de:Deutsch",
      en: "en:English",
      id: "id:Indonesia",
    });
    const partial = Schema.decodeSync(CopySchema)({ en: "English" });
    expect(
      mapLocalizedSource(partial, (value, locale) => `${locale}:${value}`)
    ).toEqual({ en: "en:English" });
    expect(
      Object.keys(
        mapLocalizedSource(source, (value, locale) => `${locale}:${value}`)
      )
    ).toEqual(APP_LOCALE_CODES);
    await expect(
      Effect.runPromise(
        traverseLocalizedSources(source, (value, locale) =>
          Effect.succeed(`${locale}:${value}`)
        )
      )
    ).resolves.toEqual({
      de: "de:Deutsch",
      en: "en:English",
      id: "id:Indonesia",
    });
    await expect(
      Effect.runPromise(
        traverseLocalizedSources(partial, (value, locale) =>
          Effect.succeed(`${locale}:${value}`)
        )
      )
    ).resolves.toEqual({ en: "en:English" });
  });
});
