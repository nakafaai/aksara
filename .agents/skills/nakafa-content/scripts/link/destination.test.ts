import { assert, it } from "@effect/vitest";

import {
  externalMatch,
  isDestinationAttribute,
  isExternalDestination,
  isSrcSetAttribute,
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
  assert.deepEqual(
    externalMatch("/small.png 1x, //example.org/large.png 2x", true, true),
    { index: 15, value: "//" }
  );
  assert.equal(
    externalMatch("/small.png 1x, /large.png 2x", true, true),
    undefined
  );
  for (const host of ["localhost", "127.0.0.1", "[::1]"]) {
    assert.ok(
      externalMatch(`/small.png 1x, //${host}/large.png 2x`, true, true)
    );
  }
});

it("recognizes exact, case-insensitive, and suffixed destination fields", () => {
  assert.equal(isDestinationAttribute(undefined), false);
  assert.equal(isDestinationAttribute("formAction"), true);
  assert.equal(isDestinationAttribute("sourceURL"), true);
  assert.equal(isDestinationAttribute("sourceUri"), true);
  assert.equal(isDestinationAttribute("data", "object"), true);
  assert.equal(isDestinationAttribute("data", "Object"), false);
  assert.equal(isDestinationAttribute("data", "Chart"), false);
  assert.equal(isDestinationAttribute("title"), false);
  assert.equal(isSrcSetAttribute(undefined, "img"), false);
  assert.equal(isSrcSetAttribute("srcSet", "img"), true);
  assert.equal(isSrcSetAttribute("srcset", "source"), true);
  assert.equal(isSrcSetAttribute("srcSet", "Image"), false);
  assert.equal(isSrcSetAttribute("href", "img"), false);
});
