import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Bukti genetik berusia sekitar $$1{.}400$$ tahun membantu merekonstruksi sejarah evolusi virus variola.",
        },
        {
          isCorrect: false,
          label:
            "Sampel DNA purba termuda dalam penelitian tersebut berasal dari sekitar tahun $$600$$ M.",
        },
        {
          isCorrect: false,
          label:
            "Sisa arkeologis tersebut tidak mengandung DNA variola yang dapat dideteksi.",
        },
        {
          isCorrect: false,
          label:
            "Penelitian tersebut membuktikan bahwa cacar berasal dari Eropa utara pada Zaman Viking.",
        },
        {
          isCorrect: false,
          label: "Semua pernyataan di atas salah.",
        },
      ],
    },
  },
};

export default item;
