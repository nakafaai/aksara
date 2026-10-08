import { describe, expect, it } from "@effect/vitest";
import { Option, Schema } from "effect";
import { decodeJsonText, encodeJsonText } from "#cli/text/json";

describe("plain JSON text", () => {
  it("writes the bytes JSON.stringify writes for nested data", () => {
    expect(
      encodeJsonText({
        list: [true, null, "x"],
        nested: { text: "café" },
        number: 1.5,
      })
    ).toBe(
      '{"list":[true,null,"x"],"nested":{"text":"café"},"number":1.5}'
    );
  });

  it("parses text into the value it names", () => {
    expect(
      Option.getOrUndefined(
        Schema.decodeOption(decodeJsonText)('{"list":[1,"a"]}')
      )
    ).toEqual({ list: [1, "a"] });
  });

  it("returns no value for malformed text", () => {
    expect(Option.isNone(Schema.decodeOption(decodeJsonText)("{"))).toBe(true);
  });
});
