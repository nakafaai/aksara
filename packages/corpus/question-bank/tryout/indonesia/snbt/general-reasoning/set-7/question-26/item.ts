import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
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
          label: "$$A$$",
        },
      ],
    },
  },
};

export default item;
