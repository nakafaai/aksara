import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "water-tank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tandon air hujan menurunkan pemakaian air PDAM dengan besar yang sama setiap bulan.",
        },
        {
          correct: true,
          label:
            "Tandon air hujan menurunkan pemakaian air PDAM, terutama ketika tandon terisi air hujan.",
        },
        {
          correct: false,
          label:
            "Rumah tanpa tandon memakai air jauh lebih banyak ketika hujan jarang turun.",
        },
        {
          correct: false,
          label: "Warga yang memakai tandon tidak memerlukan air PDAM lagi.",
        },
        {
          correct: false,
          label: "Pemakaian air rumah tanpa tandon naik setiap bulan.",
        },
      ],
    },
  },
};

export default item;
