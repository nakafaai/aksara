import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Kampung Pesisir Werur",
        },
        { isCorrect: false, label: "Proyek tanggul" },
        { isCorrect: false, label: "Tambrauw" },
        { isCorrect: false, label: "Pantai" },
        {
          isCorrect: false,
          label: "Kawasan pesisir Papua Barat Daya",
        },
      ],
    },
  },
};

export default item;
