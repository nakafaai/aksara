import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "term-meaning",
  },
  stimulus: "tsunami",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pancuran air yang menyembur tegak ke atas.",
        },
        {
          correct: false,
          label:
            "Tabel yang memuat data ketinggian air laut di beberapa stasiun pengamatan.",
        },
        {
          correct: true,
          label:
            "Seluruh massa air laut dari dasar sampai permukaan di atas suatu tempat.",
        },
        {
          correct: false,
          label: "Aliran sungai yang bermuara ke laut.",
        },
        {
          correct: false,
          label: "Awan tebal yang membawa hujan.",
        },
      ],
    },
  },
};

export default item;
