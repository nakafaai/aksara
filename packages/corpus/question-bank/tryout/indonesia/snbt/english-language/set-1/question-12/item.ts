import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "UNESCO works only to protect famous cultural monuments.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "UNESCO mainly writes domestic laws that every government must adopt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "UNESCO was created to manage the Sustainable Development Goals after 2015.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "UNESCO builds peace through international cooperation, shared standards, knowledge, and programs across its fields of expertise.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "UNESCO replaces national education and science institutions with one global system.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
