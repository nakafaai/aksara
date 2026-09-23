import { assert, it } from "@effect/vitest";
import {
  findBodyHighlightIssues,
  reviewTeachingSections,
} from "#nakafa-content/body/review";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

it("exposes unmarked plain explanations even above the thin-body limit", () => {
  const reviews = reviewTeachingSections(
    parseLessonMdx(
      [
        "export const metadata = {};",
        "",
        "## Components",
        "",
        "A vector has a component along each coordinate axis. The sign records the direction along that axis. The same vector can be expressed in different coordinate systems, so name the axes before interpreting the numbers.",
        "",
        "### Example",
        "",
        "The **positive component** points along the chosen positive direction.",
        "",
        '<BlockMath math="A_x=3" />',
      ].join("\n")
    )
  );
  assert.deepEqual(
    reviews.map(({ heading, signals }) => ({ heading, signals })),
    [
      {
        heading: "Components",
        signals: ["unmarked-body", "prose-without-representation"],
      },
      { heading: "Example", signals: [] },
    ]
  );
  assert.ok((reviews[0]?.proseWords ?? 0) > 25);
  assert.deepEqual(reviews[1]?.components, ["BlockMath"]);
});

it("does not let heading markers or source syntax stand in for teaching", () => {
  const [review] = reviewTeachingSections(
    parseLessonMdx(
      '## **Vectors**\n\nA vector has direction. <InlineMath math="x" />\n\n{"not prose"}\n\n{/* comment */}'
    )
  );
  assert.equal(review?.proseWords, 4);
  assert.deepEqual(review?.signals, [
    "unmarked-body",
    "prose-without-representation",
  ]);
  assert.deepEqual(review?.components, []);
});

it("records nested lists and paragraph length without declaring them defects", () => {
  const [list, paragraph] = reviewTeachingSections(
    parseLessonMdx(
      `## List\n\n- First item\n  - Nested item\n\n## Paragraph\n\n${"word ".repeat(100)}`
    )
  );
  assert.ok(list?.signals.includes("nested-list"));
  assert.ok(list?.signals.includes("list-only-body"));
  assert.ok(paragraph?.signals.includes("long-paragraph"));
});

it("recognizes tables, code, quotations and components as support", () => {
  for (const representation of [
    "| Input | Output |\n| --- | --- |\n| One | Two |",
    "```python\nprint(2)\n```",
    "> An exact quotation.",
    '<LineEquation title="Example" description="Compare the lines." data={[]} />',
  ]) {
    const [review] = reviewTeachingSections(
      parseLessonMdx(
        `**The deciding condition** is stated in prose.\n\n${representation}`
      )
    );
    assert.deepEqual(review?.signals, []);
    assert.equal(review?.heading, "");
  }
  assert.deepEqual(reviewTeachingSections({ type: "root" }), []);
  assert.equal(
    reviewTeachingSections({
      children: [{ type: "paragraph" }],
      type: "root",
    })[0]?.line,
    1
  );
});

it("requires a phrase in every authored heading body independently", () => {
  const tree = parseLessonMdx(
    [
      "export const metadata = {};",
      "## **Components**",
      "A vector has a component along each coordinate axis.",
      "### Example",
      "The **negative sign** identifies the opposite direction.",
      "#### Check",
      "Substituting the coordinates confirms the magnitude.",
    ].join("\n\n")
  );
  assert.deepEqual(findBodyHighlightIssues(tree), [
    {
      column: 1,
      excerpt: "Components",
      line: 3,
      rule: "section-body-highlight",
    },
    { column: 1, excerpt: "Check", line: 11, rule: "section-body-highlight" },
  ]);
});

it("preserves exact quotations, pure notation, and unheaded introductions", () => {
  for (const body of [
    "An introduction has its own opening rule.",
    "## Source\n\n> Exact quotation with no authored emphasis.",
    '## Formula\n\n<BlockMath math="x=2" />',
    "## Parent\n\n### Child\n\nThe **sign of the component** gives its direction.",
  ]) {
    assert.deepEqual(
      findBodyHighlightIssues(
        parseLessonMdx(`export const metadata = {};\n\n${body}`)
      ),
      []
    );
  }
  assert.deepEqual(
    findBodyHighlightIssues(
      parseLessonMdx("## Unowned source\n\nExact wording.")
    ),
    []
  );
});

it("checks the unheaded body rendered beneath an app-owned answer heading", () => {
  const tree = parseLessonMdx(
    "export const metadata = {};\n\nThe two values have the same denominator."
  );
  assert.deepEqual(findBodyHighlightIssues(tree, true), [
    { column: 1, excerpt: "", line: 3, rule: "section-body-highlight" },
  ]);
});

it("does not borrow emphasis from a quotation or a component label", () => {
  for (const support of [
    "> A **quoted condition** remains exact.",
    "<LineEquation data={[{ points: [], labels: [{ text: <Highlight>Line label</Highlight> }] }]} />",
    "```md\n**A code sample**\n```",
  ]) {
    const tree = parseLessonMdx(
      `export const metadata = {};\n\n## Reasoning\n\nThe signs identify opposite directions.\n\n${support}`
    );
    assert.equal(findBodyHighlightIssues(tree).length, 1);
  }
  const tree = parseLessonMdx(
    "export const metadata = {};\n\n## Reasoning\n\nThe <Highlight>negative sign</Highlight> identifies the opposite direction."
  );
  assert.deepEqual(findBodyHighlightIssues(tree), []);
});

it("preserves exact inline quotations across marks, entities, and paragraphs", () => {
  for (const quotation of [
    '"The river flooded after two days of rain."',
    "“The river flooded after **two days of rain**.”",
    "„Der Fluss trat nach <Highlight>zwei Regentagen</Highlight> über die Ufer.“",
    "&quot;Sungai meluap setelah **dua hari hujan**.&quot;",
    '"The river flooded after two days of rain.\n\nThe bridge was closed."',
  ]) {
    const tree = parseLessonMdx(
      `export const metadata = {};\n\n#### Quoted evidence\n\n${quotation}`
    );
    assert.deepEqual(findBodyHighlightIssues(tree, true), []);
    assert.equal(reviewTeachingSections(tree)[0]?.proseWords, 0);
  }
});

it("inventories quoted-only emphasis without inferring source ownership", () => {
  for (const quotation of [
    '"The river flooded after **two days of rain**."',
    "“The river flooded after <Highlight>two days of rain</Highlight>.”",
    '"The river flooded.\n\nThe **bridge was closed**."',
  ]) {
    const tree = parseLessonMdx(
      `export const metadata = {};\n\n#### Evidence\n\nRainfall caused the flooding. The passage says, ${quotation}`
    );
    assert.deepEqual(findBodyHighlightIssues(tree), []);
    assert.ok(
      reviewTeachingSections(tree)[0]?.signals.includes("quoted-emphasis-only")
    );
    assert.equal(reviewTeachingSections(tree)[0]?.proseWords, 7);
  }
  const tree = parseLessonMdx(
    'export const metadata = {};\n\n#### Evidence\n\n**Rainfall** caused the flooding. The passage says, "The river flooded after two days of rain."'
  );
  assert.deepEqual(findBodyHighlightIssues(tree), []);
  assert.ok(
    !reviewTeachingSections(tree)[0]?.signals.includes("quoted-emphasis-only")
  );
});

it("keeps apostrophes and unmatched quotation marks in authored prose", () => {
  for (const body of [
    "The student's calculation uses the original denominator.",
    "The students’ calculations use the original denominator.",
    "The passage begins “Rainfall caused flooding. The original denominator remains unchanged.",
    'The passage begins "Rainfall caused flooding. The next quotation is "A separate quoted sentence."',
  ]) {
    const tree = parseLessonMdx(
      `export const metadata = {};\n\n#### Reasoning\n\n${body}`
    );
    assert.equal(findBodyHighlightIssues(tree).length, 1);
  }
});

it("retains meaningful inline code and static expression emphasis", () => {
  for (const body of [
    'The <Highlight>{"negative sign"}</Highlight> identifies direction.',
    "The **`dtype`** field names the numeric representation.",
    'The **sign of the component** determines direction. The literal `"` is a quotation character.',
  ]) {
    const tree = parseLessonMdx(
      `export const metadata = {};\n\n## Reasoning\n\n${body}`
    );
    assert.deepEqual(findBodyHighlightIssues(tree), []);
  }
});

it("preserves quoted terminology and authored diagnostic questions", () => {
  for (const body of [
    'To find the probability of “event <InlineMath math="A" /> **OR** event <InlineMath math="B" />,” use the union.',
    'Ask yourself: "Can these events occur **simultaneously in one experiment**?" If they cannot, they are mutually exclusive.',
    "Das Ministerium verwendet den Begriff „**Neue und erneuerbare Energie**“, abgekürzt EBT.",
  ]) {
    const tree = parseLessonMdx(
      `export const metadata = {};\n\n## Reasoning\n\n${body}`
    );
    assert.deepEqual(findBodyHighlightIssues(tree), []);
    assert.ok(
      reviewTeachingSections(tree)[0]?.signals.includes("quoted-emphasis-only")
    );
  }
});

it("distinguishes answer and step identifiers from decisive teaching phrases", () => {
  for (const label of [
    "Soal 1",
    "Jawaban 1",
    "Answer 1",
    "Antwort 1",
    "Langkah 2",
    "Problem 3",
    "Step 1",
    "Aufgabe 2",
    "Schritt 1",
  ]) {
    for (const marker of [`**${label}**`, `<Highlight>${label}</Highlight>`]) {
      const source = `export const metadata = {};

### Solutions

${marker}. The denominator must be positive.`;
      assert.equal(findBodyHighlightIssues(parseLessonMdx(source)).length, 1);
      assert.deepEqual(
        findBodyHighlightIssues(
          parseLessonMdx(
            `${source} Its **positive sign** selects the valid interval.`
          )
        ),
        []
      );
    }
  }
  assert.deepEqual(
    findBodyHighlightIssues(
      parseLessonMdx(
        "export const metadata = {};\n\n### Method\n\n**Step 1 uses the product rule** because both factors depend on the variable."
      )
    ),
    []
  );
});
