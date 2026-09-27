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
          isCorrect: true,
          label: "Mesin C",
        },
        {
          isCorrect: false,
          label: "Mesin A dan C sama tinggi",
        },
        {
          isCorrect: false,
          label: "Mesin B dan C sama tinggi",
        },
      ],
    },
  },
};

export default item;
