import { assert, it } from "@effect/vitest";
import { isHeadingOnlyChange } from "#nakafa-content/heading/relabel";

const BASE = "Intro.\n\n## Latihan\n\nSolve it.\n\n### Pembahasan\n\nIt is 4.";

it("finds a change that edits only headings", () => {
  assert.isTrue(
    isHeadingOnlyChange(
      BASE,
      "Intro.\n\n## Latihan Arsiran\n\nSolve it.  \n\n### Pembahasan Arsiran\n\nIt is 4."
    )
  );
});

it("keeps a change that edits any other line, or no heading", () => {
  assert.isFalse(
    isHeadingOnlyChange(
      BASE,
      "Intro.\n\n## Latihan Arsiran\n\nShade it.\n\n### Pembahasan\n\nIt is 4."
    )
  );
  assert.isFalse(isHeadingOnlyChange(BASE, `${BASE}  `));
});
