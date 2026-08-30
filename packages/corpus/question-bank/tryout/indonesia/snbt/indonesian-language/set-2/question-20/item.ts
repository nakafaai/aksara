import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kereta seremonial",
        },
        {
          isCorrect: false,
          label: "Kedai makanan siap saji Romawi",
        },
        {
          isCorrect: false,
          label: "Lukisan dinding erotis",
        },
        {
          isCorrect: true,
          label: "Perbudakan dan kerja paksa",
        },
        {
          isCorrect: false,
          label: "Kampanye pemilihan umum",
        },
      ],
    },
  },
};

export default item;
