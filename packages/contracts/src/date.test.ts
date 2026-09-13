import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  DateOnlySchema,
  type PublicationDates,
  PublicationDatesSchema,
} from "#contracts/date";

describe("date only", () => {
  it("accepts a real leap-day date", () => {
    expect(Schema.decodeSync(DateOnlySchema)("2024-02-29")).toBe("2024-02-29");
  });

  it.each(["not-a-date", "2026-02-29", "2026-13-01"])(
    "rejects invalid calendar date %s",
    (date) => {
      expect(Exit.isFailure(Schema.decodeExit(DateOnlySchema)(date))).toBe(
        true
      );
    }
  );

  it("rejects obsolete date fields at the exact publication decoder", () => {
    expectTypeOf<keyof PublicationDates>().toEqualTypeOf<
      "dateModified" | "datePublished"
    >();

    const dual = {
      date: "2024-01-01",
      datePublished: "2024-01-01",
    };
    const decode = Schema.decodeUnknownExit(PublicationDatesSchema, {
      onExcessProperty: "error",
    });

    expect(Exit.isFailure(decode(dual))).toBe(true);
  });
});
