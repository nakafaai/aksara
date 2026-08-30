import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The songbird species" }],
        },
        { isCorrect: true, label: [{ kind: "text", text: "The researchers" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The pathogen communities" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The Palaearctic regions" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The immune-recognition genes" }],
        },
      ],
    },
  },
};

export default item;
