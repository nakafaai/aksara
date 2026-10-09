import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Schema } from "effect";
import {
  encodeJsonText,
  encodePrettyJsonText,
  JsonTextSchema,
} from "#scripts/text/json";

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
    const text = "\u{d1}and\u{fa} caf\u{e9} \u{1f600}";
    expect(encodeJsonText(text)).toBe(`"${text}"`);
  });

  it("writes numbers the way JSON.stringify does", () => {
    expect(encodeJsonText(1.5)).toBe("1.5");
    expect(encodeJsonText(-0)).toBe("0");
  });

  it("reads JSON text into the value JSON.parse reads", () => {
    expect(
      Schema.decodeSync(JsonTextSchema)('{"items":[1,"\\u00d1"]}')
    ).toEqual({ items: [1, "\u{d1}"] });
  });

  it("writes two-space indented text with the bytes of JSON.stringify(value, null, 2)", () => {
    const nested = {
      label: "\u{d1}",
      name: "contracts",
      nested: { empty: {}, items: [1, "two", { ok: true }] },
    };
    expect(encodePrettyJsonText(nested)).toBe(
      Arr.join(
        [
          "{",
          '  "label": "\u{d1}",',
          '  "name": "contracts",',
          '  "nested": {',
          '    "empty": {},',
          '    "items": [',
          "      1,",
          '      "two",',
          "      {",
          '        "ok": true',
          "      }",
          "    ]",
          "  }",
          "}",
        ],
        "\n"
      )
    );
  });
});
