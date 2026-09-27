import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Potret dari Sensus Pertanian Indonesia 2023",
        },
        {
          isCorrect: false,
          label: "Perkembangan Pertanian Indonesia",
        },
        {
          isCorrect: false,
          label: "Penurunan Usaha Pertanian Perorangan",
        },
        {
          isCorrect: false,
          label: "Mengapa Indonesia Memerlukan Modernisasi Pertanian?",
        },
        {
          isCorrect: false,
          label: "Sensus Pertanian 2023 Dilaksanakan di Seluruh Indonesia",
        },
      ],
    },
  },
};

export default item;
