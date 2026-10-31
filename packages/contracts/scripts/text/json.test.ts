import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";
import { encodePrettyJsonText } from "#scripts/text/json";

describe("pretty JSON text", () => {
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
