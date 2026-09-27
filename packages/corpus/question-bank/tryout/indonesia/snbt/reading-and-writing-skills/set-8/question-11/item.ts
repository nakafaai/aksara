import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisa efektivitas formulir dengan pilihan lokasi terstruktur",
        },
        {
          isCorrect: false,
          label:
            "analisis efektifitas formulir dengan pilihan lokasi terstruktur",
        },
        {
          isCorrect: false,
          label:
            "analisa efektifitas formulir dengan pilihan lokasi terstruktur",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas formulir lokasi dalam kontek layanan barang hilang",
        },
        {
          isCorrect: true,
          label:
            "analisis efektivitas formulir dengan pilihan lokasi terstruktur",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
