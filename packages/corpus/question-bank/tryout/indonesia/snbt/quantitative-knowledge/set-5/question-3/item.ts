import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Wenn " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " korrekt sind." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Wenn " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " korrekt sind." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Wenn " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " korrekt sind." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Wenn nur " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " korrekt ist." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Wenn alles richtig ist." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "If " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: ", and " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " are correct." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "If " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " are correct." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "If " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " are correct." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "If only " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " is correct." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "If all are correct." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jika " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: ", dan " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " yang betul." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jika " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " yang betul." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jika " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " yang betul." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Jika " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " saja yang betul." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Jika semuanya betul." }],
        },
      ],
    },
  },
};

export default item;
