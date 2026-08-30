import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\text{MMM}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{NNN}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{PPP}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{QQQ}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{RRR}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\text{MMM}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{NNN}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{PPP}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{QQQ}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{RRR}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\text{MMM}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{NNN}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{PPP}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{QQQ}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{RRR}" }],
        },
      ],
    },
  },
};

export default item;
