import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label digunakan karena lembar pengiriman terbukti gagal dalam setiap keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Label diterapkan permanen dan lembar pengiriman tidak dipakai lagi.",
        },
        {
          isCorrect: false,
          label:
            "Label dan cara lama digunakan tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan penggunaan label hanya dengan komentar tentang lembar pengiriman.",
        },
        {
          isCorrect: true,
          label:
            "Pada hari uji, tiap baki diberi label lokasi tanam tahan air, sedangkan pada hari pembanding tujuan hanya tertulis di lembar pengiriman.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
