import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0 \\leq x \\leq 30" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30 \\leq x \\leq 35" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "30 \\leq x \\leq 40" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "20 \\leq x \\leq 30" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kann nicht bestimmt werden" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0 \\leq x \\leq 30" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30 \\leq x \\leq 35" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "30 \\leq x \\leq 40" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "20 \\leq x \\leq 30" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Cannot be determined" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0 \\leq x \\leq 30" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30 \\leq x \\leq 35" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "30 \\leq x \\leq 40" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "20 \\leq x \\leq 30" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tidak dapat ditentukan" }],
        },
      ],
    },
  },
};

export default item;
