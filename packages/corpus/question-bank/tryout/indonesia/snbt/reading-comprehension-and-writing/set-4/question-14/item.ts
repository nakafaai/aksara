import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "peron",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kata _menghitung_ diganti dengan _mencatat_",
        },
        { correct: false, label: "kata _kelima_ diganti dengan _setiap_" },
        {
          correct: false,
          label: "kata _bergiliran_ diganti dengan _bergantian_",
        },
        { correct: false, label: "kata _terhitung_ diganti dengan _terbaca_" },
        { correct: true, label: "kata _bergiliran_ diganti dengan _serentak_" },
      ],
    },
  },
};

export default item;
