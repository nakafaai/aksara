import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " sind korrekt" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " sind korrekt" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " sind korrekt" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nur " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " ist korrekt" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "alle sind richtig" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: ", and " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " are correct" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " are correct" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " are correct" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " only is correct" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "all are correct" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: ", dan " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " benar" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " benar" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " benar" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " saja benar" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "semua benar" }],
        },
      ],
    },
  },
};

export default item;
