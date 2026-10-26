import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "analisa efektivitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          correct: false,
          label:
            "analisis efektifitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          correct: true,
          label:
            "analisis efektivitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          correct: false,
          label:
            "analisa efektifitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          correct: false,
          label:
            "analisis efektivitas peta kecil dengan waktu tempuh dalam kontek taman kota",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
