import { assert, it } from "@effect/vitest";
import { findExerciseAnswerIssues } from "#nakafa-content/exercise/answers";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findDocumentIssues } from "#nakafa-content/voice/document";
import { isBlockingLessonVoiceIssue } from "#nakafa-content/voice/policy";

const METADATA = "export const metadata = {};\n\n";
const QUESTIONS = "1. Find the bacterial count.\n2. Find the population.\n\n";

it.each([
  ["id", "Latihan", "Pembahasan", "Soal"],
  ["en", "Practice Problems", "Worked Solutions", "Problem"],
  ["de", "Übungsaufgaben", "Lösungen", "Aufgabe"],
] as const)(
  "requires %s answer numbers, not merely topic names or step numbers",
  (locale, exercise, solution, label) => {
    const prefix = `${METADATA}## ${exercise}\n\n${QUESTIONS}### ${solution}\n\n`;
    const unlabeled = `${prefix}The culture doubles.\n\nThe population grows annually.`;
    const issues = findExerciseAnswerIssues(
      unlabeled,
      parseLessonMdx(unlabeled),
      locale
    );
    assert.equal(issues.length, 1);
    assert.equal(issues[0]?.line, 8);
    assert.equal(issues[0]?.excerpt, `### ${solution}`);
    assert.ok(issues.every(isBlockingLessonVoiceIssue));
    const steps = `${prefix}**${label} 1**. Count intervals.\n\n1. Convert hours.\n2. Apply the formula.\n\n**Step 2**: Check.`;
    assert.equal(
      findExerciseAnswerIssues(steps, parseLessonMdx(steps), locale).length,
      1
    );
    const labeled = `${steps}\n\n**${label} 2**. Use the annual factor.`;
    assert.deepEqual(
      findExerciseAnswerIssues(labeled, parseLessonMdx(labeled), locale),
      []
    );
  }
);

it.each([
  "1. The first answer.\n2. The second answer.",
  "**Problem 1**. The first answer.\n\n2. The second answer.",
  "**Problem 1**. The first answer.\n\n<Highlight>Problem 2</Highlight>. The second answer.",
  "1. The first answer.\n\n**Problem 2**. The second answer.\n\n1. A calculation step.\n2. Another step.",
  "| Problem | Reason |\n| --- | --- |\n| 1 | Doubles |\n| 2 | Annual factor |",
  '| Problem | Reason |\n| --- | --- |\n| <InlineMath math="1" /> | Doubles |\n| <InlineMath math="2" /> | Annual factor |',
  "| Problem 1: terms | Problem 2: sums |\n| --- | --- |\n| Two | Six |",
])(
  "retains an explicit mapping through prose, lists or tables: %s",
  (answer) => {
    const source = `${METADATA}## Exercise\n\n${QUESTIONS}### Solution\n\n${answer}`;
    assert.deepEqual(
      findExerciseAnswerIssues(source, parseLessonMdx(source), "en"),
      []
    );
  }
);

it("does not borrow numbers from another exercise, nested list or code example", () => {
  const source = `${METADATA}## Exercise\n\n${QUESTIONS}### Solution\n\n**Problem 1**. Calculate.\n\n- A method\n  - Problem 2: this is not an answer boundary\n\n\`\`\`md\n**Problem 2**. Example syntax.\n\`\`\`\n\n## Exercises\n\n${QUESTIONS}### Solutions\n\n1. Answer.\n2. Answer.`;
  assert.equal(
    findExerciseAnswerIssues(source, parseLessonMdx(source), "en").length,
    1
  );
});

it("recognizes continued question numbering and rejects a missing table row", () => {
  const source = `${METADATA}## Exercise\n\n${QUESTIONS}A separate condition.\n\n3. Find the limit.\n\n### Solution\n\n| Problem | Reason |\n| --- | --- |\n| 1 | First |\n| Two | Unnumbered |\n| 3 | Third |`;
  assert.equal(
    findExerciseAnswerIssues(source, parseLessonMdx(source), "en").length,
    1
  );
});

it("leaves single items, restarted groups and unanswered practice to contextual review", () => {
  for (const source of [
    "## Concept\n\n1. Definition.\n2. Property.\n\n### Solution\n\nDiscuss.",
    `## Exercise\n\n${QUESTIONS}### Method\n\nExplain.`,
    "## Exercise\n\n1. One question.\n\n### Solution\n\nAnswer.",
    `## Exercise\n\n${QUESTIONS}Another group.\n\n1. New item.\n\n### Solution\n\nDiscuss the groups.`,
  ]) {
    assert.deepEqual(
      findExerciseAnswerIssues(source, parseLessonMdx(source), "en"),
      []
    );
  }
});

it("applies the mapping regression to lessons without changing other genres", () => {
  const source = `${METADATA}## Exercise\n\n${QUESTIONS}### Solution\n\nThe bacterial count doubles.`;
  for (const file of [
    "en.mdx",
    "answer.en.mdx",
    "question.en.mdx",
    "/corpus/articles/test/en.mdx",
  ]) {
    const mapping = findDocumentIssues(
      file,
      "en",
      source,
      parseLessonMdx(source)
    ).filter(({ rule }) => rule === "exercise-answer-reference");
    assert.equal(mapping.length, file === "en.mdx" ? 1 : 0);
  }
});

it("ignores absent parser positions and incomplete identifiers", () => {
  assert.deepEqual(findExerciseAnswerIssues("", { type: "root" }, "en"), []);
  const source = `## Exercise\n\n${QUESTIONS}### Solution\n\n| Problem | Reason |\n| --- | --- |\n| 1 | First |`;
  const tree = parseLessonMdx(source);
  const solution = tree.children?.find((node) => node.depth === 3);
  assert.ok(solution);
  solution.position = {};
  assert.deepEqual(findExerciseAnswerIssues(source, tree, "en"), []);
  const table = tree.children?.find((node) => node.type === "table");
  assert.ok(table);
  table.children?.push({ children: [], type: "tableRow" });
  table.children?.push({ type: "tableRow" });
  table.children?.push({
    children: [
      {
        children: [{ name: "InlineMath", type: "mdxJsxTextElement" }],
        type: "tableCell",
      },
    ],
    type: "tableRow",
  });
  table.children?.push({
    children: [{ children: [{ type: "text" }], type: "tableCell" }],
    type: "tableRow",
  });
  const list = tree.children?.find((node) => node.type === "list");
  assert.ok(list);
  list.start = null;
  tree.children?.push({ type: "table" });
  tree.children?.push({ children: [{ type: "tableRow" }], type: "table" });
  tree.children?.push({ ordered: true, type: "list" });
  solution.position = { start: { offset: source.indexOf("###") } };
  const incomplete: MdxNode = { children: tree.children ?? [], type: "root" };
  assert.equal(findExerciseAnswerIssues(source, incomplete, "en").length, 1);
  table.children = [];
  assert.equal(findExerciseAnswerIssues(source, incomplete, "en").length, 1);
});
