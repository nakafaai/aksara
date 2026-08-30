import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sogar.",
        },
        {
          isCorrect: false,
          label: "und.",
        },
        {
          isCorrect: false,
          label: "wann.",
        },
        {
          isCorrect: true,
          label: "dass.",
        },
        {
          isCorrect: false,
          label: "falls.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "even.",
        },
        {
          isCorrect: false,
          label: "and.",
        },
        {
          isCorrect: false,
          label: "when.",
        },
        {
          isCorrect: true,
          label: "that.",
        },
        {
          isCorrect: false,
          label: "if.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "bahkan.",
        },
        {
          isCorrect: false,
          label: "dan.",
        },
        {
          isCorrect: false,
          label: "ketika.",
        },
        {
          isCorrect: true,
          label: "bahwa.",
        },
        {
          isCorrect: false,
          label: "jika.",
        },
      ],
    },
  },
};

export default item;
