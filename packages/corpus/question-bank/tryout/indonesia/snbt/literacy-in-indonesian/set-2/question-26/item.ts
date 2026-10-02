import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Jawa Barat" },
        { isCorrect: false, label: "Jawa Timur" },
        { isCorrect: true, label: "Jawa Tengah" },
        {
          isCorrect: false,
          label: "Nusa Tenggara Barat",
        },
        {
          isCorrect: false,
          label: "Sulawesi Selatan",
        },
      ],
    },
  },
};

export default item;
