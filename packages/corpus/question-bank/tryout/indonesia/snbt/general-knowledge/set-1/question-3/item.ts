import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "aber.",
        },
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
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "but.",
        },
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
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "tetapi.",
        },
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
      ],
    },
  },
};

export default item;
