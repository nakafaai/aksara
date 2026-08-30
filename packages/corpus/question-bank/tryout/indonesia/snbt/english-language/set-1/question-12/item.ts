import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "UNESCO works only to protect famous cultural monuments.",
        },
        {
          isCorrect: false,
          label:
            "UNESCO mainly writes domestic laws that every government must adopt.",
        },
        {
          isCorrect: false,
          label:
            "UNESCO was created to manage the Sustainable Development Goals after 2015.",
        },
        {
          isCorrect: true,
          label:
            "UNESCO builds peace through international cooperation, shared standards, knowledge, and programs across its fields of expertise.",
        },
        {
          isCorrect: false,
          label:
            "UNESCO replaces national education and science institutions with one global system.",
        },
      ],
    },
  },
};

export default item;
