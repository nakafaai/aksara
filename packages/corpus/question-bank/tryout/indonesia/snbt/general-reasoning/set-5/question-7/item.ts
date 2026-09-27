import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kartu menunjukkan kadar air tinggi",
        },
        {
          isCorrect: false,
          label: "Kartu menunjukkan karbohidrat rendah",
        },
        {
          isCorrect: false,
          label: "Kartu menunjukkan kadar lemak rendah",
        },
        {
          isCorrect: false,
          label: "Kartu tidak menunjukkan karbohidrat tinggi",
        },
        {
          isCorrect: true,
          label: "Kartu menunjukkan kadar lemak tinggi",
        },
      ],
    },
  },
};

export default item;
