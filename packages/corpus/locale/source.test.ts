import {
  APP_LOCALE_CODES,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";

import {
  EMBEDDED_APP_LOCALE_CODES,
  EmbeddedAppLocaleCodeSchema,
  LOCALE_OVERLAY_APP_LOCALE_CODES,
  localizedSourceMapSchema,
  mapLocalizedSource,
  requireSourceLocale,
  traverseLocalizedSources,
} from "#corpus/locale/source";

const CopySchema = localizedSourceMapSchema(
  Schema.Trimmed.check(Schema.isNonEmpty())
);

describe("localized source maps", () => {
  it("keeps base embedded locales fixed and derives every overlay", () => {
    expect(EMBEDDED_APP_LOCALE_CODES).toEqual(["en", "id"]);
    expect(Schema.is(EmbeddedAppLocaleCodeSchema)("de")).toBe(false);
    expect(
      APP_LOCALE_CODES.filter((appLocale) =>
        LOCALE_OVERLAY_APP_LOCALE_CODES.some(
          (overlayLocale) => overlayLocale === appLocale
        )
      )
    ).toEqual(LOCALE_OVERLAY_APP_LOCALE_CODES);
    expect([
      ...EMBEDDED_APP_LOCALE_CODES,
      ...LOCALE_OVERLAY_APP_LOCALE_CODES,
    ]).toEqual(APP_LOCALE_CODES);
  });

  it("requires embedded copy and admits permanent German overlay copy", () => {
    expect(
      Schema.decodeSync(CopySchema)({
        de: "Deutsch",
        en: "English",
        id: "Indonesia",
      })
    ).toEqual({ de: "Deutsch", en: "English", id: "Indonesia" });
    expect(() =>
      Schema.decodeUnknownSync(CopySchema)({ en: "English" })
    ).toThrow();
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
  });
});
