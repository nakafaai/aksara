import { describe, expect, it } from "@effect/vitest";
import {
  isHttpsUrl,
  isLowerKebab,
  isLowerKebabPath,
} from "#contracts/text/syntax";

describe("contract text syntax", () => {
  it.each([
    ["lower kebab", isLowerKebab, "reading-and-writing", true],
    ["uppercase segment", isLowerKebab, "Reading", false],
    ["lower kebab path", isLowerKebabPath, "one/two-three", true],
    ["empty path segment", isLowerKebabPath, "one//two", false],
    ["HTTPS URL", isHttpsUrl, "https://example.com/source", true],
    ["case-insensitive HTTPS URL", isHttpsUrl, "HTTPS://example.com", true],
    ["HTTP URL", isHttpsUrl, "http://example.com/source", false],
    ["URL whitespace", isHttpsUrl, "https://example.com/a b", false],
    ["URL without a host", isHttpsUrl, "https://?claim", false],
    ["URL with an invalid host", isHttpsUrl, "https://%", false],
  ])("checks %s", (_label, predicate, value, expected) => {
    expect(predicate(value)).toBe(expected);
  });
});
