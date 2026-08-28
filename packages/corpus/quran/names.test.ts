import { it } from "@effect/vitest";
import { Effect } from "effect";
import { describe, expect } from "vitest";

import {
  decodeQuranSurahNames,
  readQuranSurahNames,
} from "#corpus/quran/names";

describe("Quran surah names", () => {
  it.effect("decodes all reviewed Indonesian and German source values", () =>
    Effect.gen(function* () {
      const names = yield* readQuranSurahNames();

      expect([...names.keys()]).toEqual(
        Array.from({ length: 114 }, (_, index) => index + 1)
      );
      expect(names.get(2)).toEqual({ de: "Die Kuh", id: "Sapi" });
      expect(names.get(46)).toEqual({ de: "Die Dünen", id: "Ahqaf" });
      expect(names.get(108)).toEqual({
        de: "Die Fülle",
        id: "Nikmat yang Banyak",
      });
      expect(names.get(114)).toEqual({ de: "Die Menschen", id: "Manusia" });
    })
  );

  it.effect("rejects an incomplete source inventory with a typed failure", () =>
    Effect.gen(function* () {
      const error = yield* decodeQuranSurahNames([
        [1, "Pembuka", "Die Eröffnende"],
      ]).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "QuranGenerationError",
        detail: "Supplemental Quran surah-name inventory is incomplete.",
      });
    })
  );
});
