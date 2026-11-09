import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "electric-bus",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "titik pengisian dibangun karena bus listrik tidak bisa diisi daya di terminal",
        },
        {
          correct: false,
          label:
            "titik pengisian cepat membuat harga bus listrik turun setengahnya",
        },
        {
          correct: false,
          label: "pengisian cepat membuat baterai bus tidak perlu diganti lagi",
        },
        {
          correct: false,
          label: "titik pengisian dibangun khusus untuk bus solar",
        },
        {
          correct: true,
          label:
            "titik pengisian cepat menanggapi masalah lamanya pengisian daya sehingga bus dapat diisi di sela perjalanan",
        },
      ],
    },
  },
};

export default item;
