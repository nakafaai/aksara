import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Label digunakan karena lembar pengiriman terbukti gagal dalam setiap keadaan.",
        },
        {
          correct: false,
          label:
            "Label diterapkan permanen dan lembar pengiriman tidak dipakai lagi.",
        },
        {
          correct: false,
          label:
            "Label dan cara lama digunakan tanpa kondisi pembanding terpisah.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan penggunaan label hanya dengan komentar tentang lembar pengiriman.",
        },
        {
          correct: true,
          label:
            "Pada hari uji, tiap baki diberi label lokasi tanam tahan air, sedangkan pada hari pembanding tujuan hanya tertulis di lembar pengiriman.",
        },
      ],
    },
  },
};

export default item;
