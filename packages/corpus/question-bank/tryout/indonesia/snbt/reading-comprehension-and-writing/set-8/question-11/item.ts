import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "analisa efektivitas formulir dengan pilihan lokasi terstruktur",
        },
        {
          correct: false,
          label:
            "analisis efektifitas formulir dengan pilihan lokasi terstruktur",
        },
        {
          correct: false,
          label:
            "analisa efektifitas formulir dengan pilihan lokasi terstruktur",
        },
        {
          correct: false,
          label:
            "analisis efektivitas formulir lokasi dalam kontek layanan barang hilang",
        },
        {
          correct: true,
          label:
            "analisis efektivitas formulir dengan pilihan lokasi terstruktur",
        },
      ],
    },
  },
};

export default item;
