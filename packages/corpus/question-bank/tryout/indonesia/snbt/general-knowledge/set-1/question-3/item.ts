import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "jedoch.",
        },
        {
          isCorrect: false,
          label: "das.",
        },
        {
          isCorrect: false,
          label: "also.",
        },
        {
          isCorrect: false,
          label: "weil.",
        },
        {
          isCorrect: true,
          label: "aber.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "however.",
        },
        {
          isCorrect: false,
          label: "that.",
        },
        {
          isCorrect: false,
          label: "so.",
        },
        {
          isCorrect: false,
          label: "because.",
        },
        {
          isCorrect: true,
          label: "but.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "akan tetapi.",
        },
        {
          isCorrect: false,
          label: "bahwa.",
        },
        {
          isCorrect: false,
          label: "sehingga.",
        },
        {
          isCorrect: false,
          label: "karena.",
        },
        {
          isCorrect: true,
          label: "tetapi.",
        },
      ],
    },
  },
};

export default item;
