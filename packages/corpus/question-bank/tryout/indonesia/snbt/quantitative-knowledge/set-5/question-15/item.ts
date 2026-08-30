import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "4 \\text{ oder } -2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-4 \\text{ oder } 2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2 \\text{ oder } 3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2 \\text{ oder } -3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3 \\text{ oder } 8" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "4 \\text{ or } -2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-4 \\text{ or } 2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2 \\text{ or } 3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2 \\text{ or } -3" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3 \\text{ or } 8" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "4 \\text{ atau } -2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-4 \\text{ atau } 2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2 \\text{ atau } 3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2 \\text{ atau } -3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3 \\text{ atau } 8" },
          ],
        },
      ],
    },
  },
};

export default item;
