import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "c4-photosynthesis",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Padi yang sudah menghasilkan semua enzim jalur C4 dalam jumlah besar ternyata tetap kehilangan $$\\mathrm{CO_2}$$ dari sel seludangnya sebelum sempat dipakai Rubisco.",
        },
        {
          correct: false,
          label:
            "Enzim-enzim jalur C4 ternyata ditemukan pada lebih banyak jenis tumbuhan C3 daripada yang diduga.",
        },
        {
          correct: false,
          label:
            "Jalur C4 ternyata muncul secara terpisah pada lebih banyak kelompok tumbuhan daripada yang diduga.",
        },
        {
          correct: false,
          label:
            "Padi yang diberi gen jalur C4 ternyata menghasilkan enzim-enzimnya tepat di sel mesofil dan sel seludang.",
        },
        {
          correct: false,
          label:
            "Biaya penelitian padi C4 ternyata jauh lebih besar daripada perkiraan semula.",
        },
      ],
    },
  },
};

export default item;
