import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bukti genetik berusia sekitar $$1{.}400$$ tahun membantu merekonstruksi sejarah evolusi virus variola.",
        },
        {
          correct: false,
          label:
            "Sampel DNA purba termuda dalam penelitian tersebut berasal dari sekitar tahun $$600$$ M.",
        },
        {
          correct: false,
          label:
            "Sisa arkeologis tersebut tidak mengandung DNA variola yang dapat dideteksi.",
        },
        {
          correct: false,
          label:
            "Penelitian tersebut membuktikan bahwa cacar berasal dari Eropa utara pada Zaman Viking.",
        },
        {
          correct: false,
          label: "Semua pernyataan di atas salah.",
        },
      ],
    },
  },
};

export default item;
