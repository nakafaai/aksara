import { assert, it } from "@effect/vitest";

import {
  externalMatch,
  isDestinationAttribute,
  isExternalDestination,
} from "#nakafa-content/link/destination";

it("classifies complete destination values without mistaking prose", () => {
  assert.equal(isExternalDestination(" //example.org/report "), true);
  assert.equal(isExternalDestination("mailto:editor@example.org"), true);
  assert.equal(isExternalDestination("/internal/report"), false);

  assert.deepEqual(externalMatch(" https://example.org/report ", true), {
    index: 1,
    value: "https://example.org/report",
  });
  assert.equal(
    externalMatch("see https://example.org/report", true),
    undefined
  );
  assert.deepEqual(externalMatch("see ftp://example.org/report", false), {
    index: 4,
    value: "ftp://",
  });
  assert.deepEqual(externalMatch("see //example.org/report", false), {
    index: 4,
    value: "//",
  });
  assert.equal(externalMatch("use //2 for division", false), undefined);
});

it("recognizes exact, case-insensitive, and suffixed destination fields", () => {
  assert.equal(isDestinationAttribute(undefined), false);
  assert.equal(isDestinationAttribute("formAction"), true);
  assert.equal(isDestinationAttribute("sourceURL"), true);
  assert.equal(isDestinationAttribute("sourceUri"), true);
  assert.equal(isDestinationAttribute("title"), false);
});
