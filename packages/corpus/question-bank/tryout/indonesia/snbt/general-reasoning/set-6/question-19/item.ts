import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pada keempat baris tersebut, produksi padi yang lebih tinggi berpasangan dengan impor beras yang lebih rendah.",
        },
        {
          correct: true,
          label:
            "Produksi beras tertinggi dan pengadaan beras tertinggi terjadi pada tahun yang sama.",
        },
        {
          correct: false,
          label:
            "Impor beras tertinggi dan pengadaan beras tertinggi sama-sama terjadi pada $$1999$$.",
        },
        {
          correct: false,
          label:
            "Produksi beras tertinggi terjadi pada baris yang sama dengan pengadaan beras terendah.",
        },
        {
          correct: false,
          label:
            "Impor beras terendah dan pengadaan beras terendah sama-sama terjadi pada $$2004$$.",
        },
      ],
    },
  },
};

export default item;
