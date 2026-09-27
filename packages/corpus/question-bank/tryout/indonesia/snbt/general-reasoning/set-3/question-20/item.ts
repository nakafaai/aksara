import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "phipllowg cz ?hmmphng",
        },
        {
          isCorrect: false,
          label: "?hhmmpowg cz ?hmmphng",
        },
        {
          isCorrect: false,
          label: "ng?hmmphowg ?hmmp cz",
        },
        {
          isCorrect: false,
          label: "ng?hmmph ?hmmpowg cz",
        },
        {
          isCorrect: true,
          label: "?hhmmphng ?hmmpowg cz",
        },
      ],
    },
  },
};

export default item;
