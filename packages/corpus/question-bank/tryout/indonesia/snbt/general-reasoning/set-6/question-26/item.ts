import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mesin A",
        },
        {
          isCorrect: false,
          label: "Mesin B",
        },
        {
          isCorrect: false,
          label: "Mesin A dan B",
        },
        {
          isCorrect: false,
          label: "Mesin B dan C",
        },
        {
          isCorrect: true,
          label: "Mesin C",
        },
      ],
    },
  },
};

export default item;
