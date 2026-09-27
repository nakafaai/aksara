import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label foto terbukti menyebabkan kenaikan rata-rata alat yang dikembalikan dengan tepat.",
        },
        {
          isCorrect: false,
          label: "Setiap peminjam mengalami peningkatan yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata pengembalian yang tepat pada sesi uji melebihi rata-rata awal dan sesi pembanding.",
        },
        {
          isCorrect: false,
          label: "Rata-rata awal dan rata-rata sesi pembanding sama.",
        },
        {
          isCorrect: false,
          label: "Uji singkat memastikan hasil jangka panjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
