import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "medicine-delivery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dilatihnya dua puluh relawan muda",
        },
        {
          correct: false,
          label: "kunjungan tambahan bagi warga yang tinggal sendiri",
        },
        {
          correct: true,
          label: "berkurangnya warga lanjut usia yang lupa minum obat",
        },
        {
          correct: false,
          label: "pemeriksaan catatan kesehatan setiap Senin",
        },
        {
          correct: false,
          label: "pengantaran obat pada hari yang sama",
        },
      ],
    },
  },
};

export default item;
