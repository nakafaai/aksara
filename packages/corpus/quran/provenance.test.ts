import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { makeQuranProvenanceManifest } from "@nakafa/aksara-contracts/quran/provenance";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { AUTHORING_APP_LOCALES } from "#corpus/locale/source";
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

    expect(activeRecords).toHaveLength(5);
    expect(new Set(activeRecords.map(({ scope }) => scope))).toEqual(
      new Set([
        "arabic-text",
        "en-translation",
        "id-tafsir",
        "id-translation",
        "metadata",
      ])
    );
    expect(manifest.status).toBe("approved");
    expect(
      activeRecords.every(
        ({ attribution }) => attribution.retrievedAt === "2026-07-24T17:57:50Z"
      )
    ).toBe(true);
  });

  it("closes German provenance and localized attribution before activation", async () => {
    const records = await Effect.runPromise(
      quranProvenanceRecordsFor(AUTHORING_APP_LOCALES)
    );
    const manifest = await Effect.runPromise(
      makeQuranProvenanceManifest({
        activeAppLocales: AUTHORING_APP_LOCALES,
        records,
      })
    );
    const german = records.find(({ scope }) => scope === "de-translation");

    expect(records).toHaveLength(6);
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
  });
});
