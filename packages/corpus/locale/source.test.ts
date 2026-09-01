import { describe, expect, it, test } from "@effect/vitest";
import {
  APP_LOCALE_CODES,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
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
  test("admits complete and partial copy for contract-supported locales", () => {
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

  it.effect("fails typed when requested copy is absent", () =>
    Effect.gen(function* () {
      const source = yield* Schema.decodeEffect(CopySchema)({
        en: "English",
        id: "Indonesia",
      });
      const error = yield* requireSourceLocale(
        source,
        AppLocaleSchema.make("de"),
        "example"
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "SourceLocaleUnavailableError",
        appLocale: "de",
        owner: "example",
      });
    })
  );

  it.effect("maps and traverses every present copy in canonical order", () =>
    Effect.gen(function* () {
      const source = yield* Schema.decodeEffect(CopySchema)({
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
      const partial = yield* Schema.decodeEffect(CopySchema)({ en: "English" });
      expect(
        mapLocalizedSource(partial, (value, locale) => `${locale}:${value}`)
      ).toEqual({ en: "en:English" });
      expect(
        Object.keys(
          mapLocalizedSource(source, (value, locale) => `${locale}:${value}`)
        )
      ).toEqual(APP_LOCALE_CODES);
      expect(
        yield* traverseLocalizedSources(source, (value, locale) =>
          Effect.succeed(`${locale}:${value}`)
        )
      ).toEqual({
        de: "de:Deutsch",
        en: "en:English",
        id: "id:Indonesia",
      });
      expect(
        yield* traverseLocalizedSources(partial, (value, locale) =>
          Effect.succeed(`${locale}:${value}`)
        )
      ).toEqual({ en: "en:English" });
    })
  );
});
