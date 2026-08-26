import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { makeQuranProvenanceManifest } from "@nakafa/aksara-contracts/quran/provenance";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import { quranProvenanceRecordsFor } from "#corpus/quran/provenance";

describe("Quran provenance records", () => {
  it("keeps every independently reviewed source chain explicit", async () => {
    const activeRecords = await Effect.runPromise(
      quranProvenanceRecordsFor(ACTIVE_APP_LOCALES)
    );
    const manifest = await Effect.runPromise(
      makeQuranProvenanceManifest({
        activeAppLocales: ACTIVE_APP_LOCALES,
        records: activeRecords,
      })
    );

    expect(activeRecords).toHaveLength(8);
    expect(new Set(activeRecords.map(({ scope }) => scope))).toEqual(
      new Set([
        "arabic-text",
        "de-translation",
        "de-tafsir-access",
        "en-translation",
        "en-tafsir-access",
        "id-tafsir",
        "id-translation",
        "metadata",
      ])
    );
    expect(manifest.status).toBe("approved");
    expect(
      activeRecords.every(
        ({ attribution, scope }) =>
          scope === "de-translation" ||
          scope === "de-tafsir-access" ||
          scope === "en-tafsir-access" ||
          attribution.retrievedAt === "2026-07-24T17:57:50Z"
      )
    ).toBe(true);
    expect(
      activeRecords.find(({ scope }) => scope === "de-translation")?.attribution
        .retrievedAt
    ).toBe("2026-08-13T06:12:57Z");
  });

  it("closes active German provenance and localized attribution", async () => {
    const records = await Effect.runPromise(
      quranProvenanceRecordsFor(ACTIVE_APP_LOCALES)
    );
    const manifest = await Effect.runPromise(
      makeQuranProvenanceManifest({
        activeAppLocales: ACTIVE_APP_LOCALES,
        records,
      })
    );
    const german = records.find(({ scope }) => scope === "de-translation");

    expect(records).toHaveLength(8);
    expect(manifest.status).toBe("approved");
    expect(german).toMatchObject({
      attribution: {
        artifact: {
          byteCount: 1_523_305,
          digest:
            "sha256:38763b972b2efeeed3062ba3495042c28f320cf734071e010d746c525ebce47e",
        },
        copy: expect.arrayContaining([
          expect.objectContaining({
            appLocale: "de",
            title:
              "Deutsche Quranübersetzung von Frank Bubenheim und Nadim Elias",
          }),
        ]),
        id: "quranenc-german",
        version: "v1.1.4-xml.1",
      },
    });
    expect(
      records.every(({ attribution }) => attribution.copy.length === 3)
    ).toBe(true);
    expect(
      records.find(({ scope }) => scope === "en-tafsir-access")
    ).toMatchObject({
      attribution: {
        id: "mokhtasar-english",
        version: "catalog-v7",
      },
      status: "approved",
    });
  });
});
