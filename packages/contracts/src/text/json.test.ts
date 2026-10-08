import { describe, expect, it } from "@effect/vitest";
import { decodeJsonText, encodeJsonText } from "#contracts/text/json";

describe("JSON text codec", () => {
  it("writes the bytes JSON.stringify writes for a nested object", () => {
    expect(encodeJsonText({ count: 2, nested: { items: ["a", null] } })).toBe(
      '{"count":2,"nested":{"items":["a",null]}}'
    );
  });

  it("writes an array in order, without spaces", () => {
    expect(encodeJsonText([3, "two", false])).toBe('[3,"two",false]');
  });

  it("writes non-ASCII characters without escaping them", () => {
    const text = "Ñandú café \u{1f600}";
    expect(encodeJsonText(text)).toBe(`"${text}"`);
  });

  it("writes numbers the way JSON.stringify does", () => {
    expect(encodeJsonText(1.5)).toBe("1.5");
    expect(encodeJsonText(-0)).toBe("0");
  });

  it("reads JSON text into the value JSON.parse reads", () => {
    expect(decodeJsonText('{"items":[1,"\\u00d1"]}')).toEqual({
      items: [1, "Ñ"],
    });
  });
});
