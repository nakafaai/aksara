import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Jahr $$1$$",
        },
        {
          isCorrect: false,
          label: "Jahr $$2$$",
        },
        {
          isCorrect: false,
          label: "Jahr $$3$$",
        },
        {
          isCorrect: false,
          label: "Jahr $$4$$",
        },
        {
          isCorrect: false,
          label: "Jahr $$5$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Year $$1$$",
        },
        {
          isCorrect: false,
          label: "Year $$2$$",
        },
        {
          isCorrect: false,
          label: "Year $$3$$",
        },
        {
          isCorrect: false,
          label: "Year $$4$$",
        },
        {
          isCorrect: false,
          label: "Year $$5$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Tahun ke-$$1$$",
        },
        {
          isCorrect: false,
          label: "Tahun ke-$$2$$",
        },
        {
          isCorrect: false,
          label: "Tahun ke-$$3$$",
        },
        {
          isCorrect: false,
          label: "Tahun ke-$$4$$",
        },
        {
          isCorrect: false,
          label: "Tahun ke-$$5$$",
        },
      ],
    },
  },
};

export default item;
