import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ilmu",
        },
        {
          isCorrect: true,
          label: "Nasihat",
        },
        {
          isCorrect: false,
          label: "Pengalaman",
        },
        {
          isCorrect: false,
          label: "Kesan",
        },
        {
          isCorrect: false,
          label: "Perasaan",
        },
      ],
    },
  },
};

export default item;
