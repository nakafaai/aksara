import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "analisa efektivitas jadwal digital setelah pembatalan",
        },
        {
          correct: false,
          label: "analisis efektifitas jadwal digital setelah pembatalan",
        },
        {
          correct: false,
          label: "analisa efektifitas jadwal digital setelah pembatalan",
        },
        {
          correct: true,
          label: "analisis efektivitas jadwal digital setelah pembatalan",
        },
        {
          correct: false,
          label:
            "analisis efektivitas jadwal digital dalam kontek ruang latihan musik",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
