import { describe, expect, it } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  HashSet,
  Number as Num,
  Order,
  Schema,
} from "effect";

import { ContentKeySchema } from "#contracts/ids";
import { makeTryoutTestRows } from "#contracts/test/tryout";
import { TryoutCatalogNodeIdentitySchema } from "#contracts/tryout/catalog";
import {
  compareTryoutPlacements,
  tryoutCatalogIdentity,
  tryoutCatalogNodeIdentity,
  tryoutPlacementIdentity,
  tryoutPlacementLogicalIdentity,
} from "#contracts/tryout/identity";

describe("try-out placement identity", () => {
  it("derives complete-row identities from the minimal semantic contract", () => {
    const rows = Arr.map(makeTryoutTestRows().catalog, ({ row }) => row);
    const identities = Arr.map(rows, (row) => {
      const identity = Schema.decodeSync(TryoutCatalogNodeIdentitySchema)(row, {
        onExcessProperty: "ignore",
      });
      return [tryoutCatalogNodeIdentity(identity), tryoutCatalogIdentity(row)];
    });

    expect(
      Arr.every(identities, ([minimal, complete]) => minimal === complete)
    ).toBe(true);
  });

  it("keeps catalog kinds and application locales distinct", () => {
    const country = Schema.decodeSync(TryoutCatalogNodeIdentitySchema)({
      appLocale: "en",
      countryKey: "indonesia",
      kind: "country",
    });
    const exam = Schema.decodeSync(TryoutCatalogNodeIdentitySchema)({
      appLocale: "en",
      countryKey: "indonesia",
      examKey: "snbt",
      kind: "exam",
    });
    const german = Schema.decodeSync(TryoutCatalogNodeIdentitySchema)({
      ...country,
      appLocale: "de",
    });

    expect(tryoutCatalogNodeIdentity(country)).not.toBe(
      tryoutCatalogNodeIdentity(exam)
    );
    expect(tryoutCatalogNodeIdentity(country)).not.toBe(
      tryoutCatalogNodeIdentity(german)
    );
  });

  it("orders application-localized placements deterministically", () => {
    const placements = Arr.map(
      makeTryoutTestRows().placements,
      ({ row }) => row
    );
    const sorted = Arr.sort(
      placements,
      Order.make<(typeof placements)[number]>((left, right) =>
        Num.sign(compareTryoutPlacements(left, right))
      )
    );
    const [first] = sorted;

    expect(first).toBeDefined();
    expect(
      HashSet.size(
        HashSet.fromIterable(Arr.map(sorted, tryoutPlacementIdentity))
      )
    ).toBe(3);
    expect(
      HashSet.size(
        HashSet.fromIterable(Arr.map(sorted, tryoutPlacementLogicalIdentity))
      )
    ).toBe(1);
    if (first !== undefined) {
      expect(compareTryoutPlacements(first, first)).toBe(0);
    }
  });
});

describe("try-out identity golden strings", () => {
  it.effect(
    "pins the literal identity of one country, exam, section, and placement",
    () =>
      Effect.gen(function* () {
        const country = yield* Schema.decodeEffect(
          TryoutCatalogNodeIdentitySchema
        )({
          appLocale: "en",
          countryKey: "test-country",
          kind: "country",
        });
        const exam = yield* Schema.decodeEffect(
          TryoutCatalogNodeIdentitySchema
        )({
          appLocale: "en",
          countryKey: "test-country",
          examKey: "test-exam",
          kind: "exam",
        });
        const section = yield* Schema.decodeEffect(
          TryoutCatalogNodeIdentitySchema
        )({
          appLocale: "en",
          countryKey: "test-country",
          examKey: "test-exam",
          kind: "section",
          sectionKey: "test-section",
          setKey: "test-set",
          trackKey: "test-track",
        });
        const placements = Arr.map(
          makeTryoutTestRows().placements,
          ({ row }) => row
        );
        const base = yield* Effect.fromOption(
          Arr.findFirst(placements, ({ appLocale }) => appLocale === "en")
        );

        expect(tryoutCatalogNodeIdentity(country)).toBe(
          "en\u0000country\u0000test-country\u0000\u0000\u0000\u0000"
        );
        expect(tryoutCatalogNodeIdentity(exam)).toBe(
          "en\u0000exam\u0000test-country\u0000test-exam\u0000\u0000\u0000"
        );
        expect(tryoutCatalogNodeIdentity(section)).toBe(
          "en\u0000section\u0000test-country\u0000test-exam\u0000test-track\u0000test-set\u0000test-section"
        );
        expect(tryoutPlacementIdentity(base)).toBe(
          "indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge\u00001\u0000question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question\u0000en"
        );
        expect(tryoutPlacementLogicalIdentity(base)).toBe(
          "indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge\u00001\u0000question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question"
        );
      })
  );

  it.effect(
    "orders question numbers by identity text, so question ten precedes nine",
    () =>
      Effect.gen(function* () {
        const placements = Arr.map(
          makeTryoutTestRows().placements,
          ({ row }) => row
        );
        const base = yield* Effect.fromOption(
          Arr.findFirst(placements, ({ appLocale }) => appLocale === "en")
        );
        const ten = {
          ...base,
          questionContentKey: yield* Schema.decodeEffect(ContentKeySchema)(
            "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-10/question"
          ),
          questionOrder: 10,
        };
        const nine = {
          ...base,
          questionContentKey: yield* Schema.decodeEffect(ContentKeySchema)(
            "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-9/question"
          ),
          questionOrder: 9,
        };

        expect(
          Arr.map(
            Arr.sort(
              [ten, base, nine],
              Order.make<typeof base>((left, right) =>
                Num.sign(compareTryoutPlacements(left, right))
              )
            ),
            (row) => tryoutPlacementIdentity(row)
          )
        ).toEqual([
          "indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge\u00001\u0000question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question\u0000en",
          "indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge\u000010\u0000question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-10/question\u0000en",
          "indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge\u00009\u0000question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-9/question\u0000en",
        ]);
      })
  );
});
