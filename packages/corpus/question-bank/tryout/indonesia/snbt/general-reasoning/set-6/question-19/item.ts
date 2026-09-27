import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pada keempat baris tersebut, produksi padi yang lebih tinggi berpasangan dengan impor beras yang lebih rendah.",
        },
        {
          isCorrect: true,
          label:
            "Produksi beras tertinggi dan pengadaan beras tertinggi terjadi pada tahun yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Impor beras tertinggi dan pengadaan beras tertinggi sama-sama terjadi pada $$1999$$.",
        },
        {
          isCorrect: false,
          label:
            "Produksi beras tertinggi terjadi pada baris yang sama dengan pengadaan beras terendah.",
        },
        {
          isCorrect: false,
          label:
            "Impor beras terendah dan pengadaan beras terendah sama-sama terjadi pada $$2004$$.",
        },
      ],
    },
  },
};

export default item;
