import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12{,}25\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "13{,}75\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "14{,}50\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15{,}00\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15{,}75\\%" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12.25\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "13.75\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "14.50\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15.00\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15.75\\%" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12{,}25\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "13{,}75\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "14{,}50\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15{,}00\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15{,}75\\%" }],
        },
      ],
    },
  },
};

export default item;
