import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "definitiv wahr",
        },
        {
          isCorrect: true,
          label: "möglicherweise wahr",
        },
        {
          isCorrect: false,
          label: "definitiv falsch",
        },
        {
          isCorrect: false,
          label: "möglicherweise falsch",
        },
        {
          isCorrect: false,
          label: "kann nicht bestimmt werden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "definitely true",
        },
        {
          isCorrect: true,
          label: "possibly true",
        },
        {
          isCorrect: false,
          label: "definitely false",
        },
        {
          isCorrect: false,
          label: "possibly false",
        },
        {
          isCorrect: false,
          label: "cannot be determined",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "pasti benar",
        },
        {
          isCorrect: true,
          label: "mungkin benar",
        },
        {
          isCorrect: false,
          label: "pasti salah",
        },
        {
          isCorrect: false,
          label: "mungkin salah",
        },
        {
          isCorrect: false,
          label: "tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
