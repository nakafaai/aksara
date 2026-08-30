import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "definitiv wahr" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "möglicherweise wahr" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "definitiv falsch" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "möglicherweise falsch" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "kann nicht bestimmt werden" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "definitely true" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "possibly true" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "definitely false" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "possibly false" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "cannot be determined" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pasti benar" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "mungkin benar" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pasti salah" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "mungkin salah" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "tidak dapat ditentukan" }],
        },
      ],
    },
  },
};

export default item;
