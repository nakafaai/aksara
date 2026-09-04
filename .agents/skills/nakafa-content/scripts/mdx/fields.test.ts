import { assert, it } from "@effect/vitest";

import {
  isAddressTextAttribute,
  isGeneralTextAttribute,
  isNestedAddressAttribute,
  isNestedAddressField,
  isProtectedProseComponent,
} from "#nakafa-content/mdx/fields";

it("classifies direct, nested, technical, and protected learner copy", () => {
  assert.equal(isGeneralTextAttribute("title"), true);
  assert.equal(isGeneralTextAttribute("math"), false);
  assert.equal(isAddressTextAttribute("xAxisLabel"), true);
  assert.equal(isAddressTextAttribute("href"), false);
  assert.equal(isNestedAddressAttribute("datasets"), true);
  assert.equal(isNestedAddressAttribute("options"), false);
  assert.equal(isProtectedProseComponent("CodeBlock"), true);
  assert.equal(isProtectedProseComponent(undefined), false);

  const cases = [
    ["labels", "item", true],
    ["content", "input", true],
    ["content", "output", true],
    ["content", "description", false],
    ["chartConfig", "label", true],
    ["chartConfig", "name", false],
    ["datasets", "name", true],
    ["data", "name", true],
    ["data", "value", false],
    ["vectors", "name", true],
    ["vectors", "value", false],
    ["domain", "label", true],
    ["codomain", "label", true],
    ["domain", "name", false],
    ["labels", "href", false],
    ["labels", undefined, false],
  ] as const;

  for (const [attribute, field, expected] of cases) {
    assert.equal(isNestedAddressField(attribute, field), expected);
  }
});
