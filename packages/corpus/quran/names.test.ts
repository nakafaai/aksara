import { describe, expect, it } from "@effect/vitest";
import { Effect, MutableHashMap, Option } from "effect";

import {
  decodeQuranSurahNames,
  readQuranSurahNames,
} from "#corpus/quran/names";

describe("Quran surah names", () => {
  it.effect("decodes all reviewed Indonesian, German and Malay source values", () =>
    Effect.gen(function* () {
      const names = yield* readQuranSurahNames();

      expect([...MutableHashMap.keys(names)]).toEqual(
        Array.from({ length: 114 }, (_, index) => index + 1)
      );
      expect(Option.getOrUndefined(MutableHashMap.get(names, 2))).toEqual({
        de: "Die Kuh",
        id: "Sapi",
        ms: "Lembu Betina",
      });
      expect(Option.getOrUndefined(MutableHashMap.get(names, 46))).toEqual({
        de: "Die Dünen",
        id: "Ahqaf",
        ms: "Bukit-bukit Pasir",
      });
      expect(Option.getOrUndefined(MutableHashMap.get(names, 108))).toEqual({
        de: "Die Fülle",
        id: "Nikmat yang Banyak",
        ms: "Nikmat yang Banyak",
      });
      expect(Option.getOrUndefined(MutableHashMap.get(names, 114))).toEqual({
        de: "Die Menschen",
        id: "Manusia",
        ms: "Manusia",
      });
    })
  );

  it.effect("rejects an incomplete source inventory with a typed failure", () =>
    Effect.gen(function* () {
      const error = yield* decodeQuranSurahNames([
        [1, "Pembuka", "Die Eröffnende", "Pembukaan"],
      ]).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "QuranGenerationError",
        detail: "Supplemental Quran surah-name inventory is incomplete.",
      });
    })
  );
});
