import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "6\\text{ Minuten}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7\\text{ Minuten}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "8\\text{ Minuten}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "9\\text{ Minuten}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10\\text{ Minuten}" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "6\\text{ minutes}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7\\text{ minutes}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "8\\text{ minutes}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "9\\text{ minutes}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10\\text{ minutes}" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6\\text{ menit}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7\\text{ menit}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "8\\text{ menit}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9\\text{ menit}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\text{ menit}" }],
        },
      ],
    },
  },
};

export default item;
