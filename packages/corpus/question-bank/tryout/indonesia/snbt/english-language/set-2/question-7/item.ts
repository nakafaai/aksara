import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The anatomy of songbird wings" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Methods for treating immune disease in birds",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The seasonal routes of every European bird species",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Human medical advice based on bird migration",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The relationship between movement across pathogen regions and the evolution of MHC-I diversity",
            },
          ],
        },
      ],
    },
  },
};

export default item;
