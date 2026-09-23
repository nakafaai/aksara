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
  ["de", "Übung", "Lösung", "Aufgabe"],
  ["de", "Übung", "Ausführliche Lösung", "Aufgabe"],
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

it.each([
  ["en", "<h2>Exercises</h2>", "<h3>Solutions</h3>"],
  ["en", "## Exercises", "<h3><strong>Worked Solutions</strong></h3>"],
  ["en", "<h2>Practice Problems</h2>", "### Solutions"],
  ["id", "<h2>Latihan</h2>", "<h3>Pembahasan</h3>"],
  ["de", "<h2>Übung</h2>", "<h3>Ausführliche Lösung</h3>"],
  ["en", "<h2>{'Exercises'}</h2>", "<h3>Worked\nSolutions</h3>"],
] as const)(
  "checks %s answers under literal JSX headings",
  (locale, exercise, solution) => {
    const source = `${METADATA}${exercise}\n\n${QUESTIONS}${solution}\n\nA first result.\n\nA second result.`;
    assert.equal(
      findExerciseAnswerIssues(source, parseLessonMdx(source), locale).length,
      1
    );
    const mapped = `${source}\n\n1. First answer.\n2. Second answer.`;
    assert.deepEqual(
      findExerciseAnswerIssues(mapped, parseLessonMdx(mapped), locale),
      []
    );
  }
);

it("does not borrow JSX sections or component attributes as answer mappings", () => {
  const source = `${METADATA}<h2>Exercises</h2>\n\n${QUESTIONS}<h3>Solutions</h3>\n\n**Problem 1**. First answer.\n\n<h2>Another topic</h2>\n\n**Problem 2**. Another answer.`;
  assert.equal(
    findExerciseAnswerIssues(source, parseLessonMdx(source), "en").length,
    1
  );
  const unrelated = `${METADATA}<Panel title={<h2>Exercises</h2>} />\n\n${QUESTIONS}<h3>Solutions</h3>\n\nUnnumbered.`;
  assert.deepEqual(
    findExerciseAnswerIssues(unrelated, parseLessonMdx(unrelated), "en"),
    []
  );
});

it.each([
  ["en", "Exercises", "Solutions", "Problem", "Answer"],
  ["id", "Latihan", "Pembahasan", "Soal", "Jawaban"],
  ["de", "Übung", "Lösung", "Aufgabe", "Antwort"],
] as const)(
  "maps %s prose-numbered prompts to the established answer vocabulary",
  (locale, exercise, solution, prompt, answer) => {
    for (const questions of [
      `**${prompt} 1**. First prompt.\n\n**${prompt} 2**. Second prompt.`,
      `1. First prompt.\n\n**${prompt} 2**. Second prompt.`,
      `**${prompt} 1**. First prompt.\n\n2. Second prompt.`,
      QUESTIONS,
    ]) {
      const source = `${METADATA}## ${exercise}\n\n${questions}\n\n### ${solution}\n\n**${answer} 1**. First answer.\n\n`;
      for (const missing of [
        source,
        `${source}**${answer} 3**. Wrong number.`,
      ]) {
        assert.equal(
          findExerciseAnswerIssues(missing, parseLessonMdx(missing), locale)
            .length,
          1
        );
      }
      const complete = `${source}**${answer} 2**. Second answer.`;
      assert.deepEqual(
        findExerciseAnswerIssues(complete, parseLessonMdx(complete), locale),
        []
      );
    }
  }
);

it("distinguishes prose prompt labels from their calculation lists and restarted groups", () => {
  const source = `${METADATA}## Exercise\n\n**Problem 1**. First prompt.\n\n1. A step.\n2. Another step.\n\n**Problem 2**. Second prompt.\n\n### Solution\n\n**Answer 1**. First answer.`;
  assert.equal(
    findExerciseAnswerIssues(source, parseLessonMdx(source), "en").length,
    1
  );
  const restarted = source.replace("**Problem 2**", "**Problem 1**");
  assert.deepEqual(
    findExerciseAnswerIssues(restarted, parseLessonMdx(restarted), "en"),
    []
  );
});

it.each(["{<h2>Exercises</h2>}", "{<> <h2>Exercises</h2> </>}"])(
  "checks expression-wrapped section headings: %s",
  (exercise) => {
    const source = `${METADATA}${exercise}\n\n${QUESTIONS}{<h3>Solutions</h3>}\n\n**Answer 1**. First answer.\n\n{<h2>Next topic</h2>}\n\n**Answer 2**. Unrelated answer.`;
    assert.equal(
      findExerciseAnswerIssues(source, parseLessonMdx(source), "en").length,
      1
    );
    const complete = source.replace(
      "{<h2>Next topic</h2>}",
      "**Answer 2**. Second answer.\n\n{<h2>Next topic</h2>}"
    );
    assert.deepEqual(
      findExerciseAnswerIssues(complete, parseLessonMdx(complete), "en"),
      []
    );
  }
);

it.each([
  "{<Panel title={<h2>Exercises</h2>} />}",
  "{<ui.h2>Exercises</ui.h2>}",
  "{<> <h2>Exercises</h2> <p>Another block</p> </>}",
  "{'Exercises'}",
])(
  "does not infer section boundaries from opaque expressions: %s",
  (expression) => {
    const source = `${METADATA}${expression}\n\n${QUESTIONS}### Solutions\n\nAn unnumbered result.`;
    assert.deepEqual(
      findExerciseAnswerIssues(source, parseLessonMdx(source), "en"),
      []
    );
  }
);
