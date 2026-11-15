import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menanam lebih banyak individu dari berbagai populasi di kebun raya",
        },
        {
          correct: true,
          label:
            "menjaga hutan tempat populasi besar tumbuhan itu hidup bersama penyerbuk, jamur tanah, dan hewan penyebar bijinya",
        },
        {
          correct: false,
          label:
            "mendatangkan penyerbuk dan hewan penyebar biji dari hutan ke dalam kebun raya",
        },
        {
          correct: false,
          label:
            "menyimpan biji dari banyak individu di bank biji yang suhunya rendah",
        },
        {
          correct: false,
          label:
            "menanam lebih banyak individu dari berbagai populasi bersama jamur tanahnya di kebun raya",
        },
      ],
    },
  },
};

export default item;
