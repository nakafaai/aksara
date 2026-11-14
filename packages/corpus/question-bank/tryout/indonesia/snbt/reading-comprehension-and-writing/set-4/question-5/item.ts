import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "kecapi",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "kata _seluruh_ diganti dengan _semua_" },
        { correct: false, label: "kata _dapat_ diganti dengan _akan_" },
        {
          correct: false,
          label: "kata _sekaligus_ diganti dengan _berturut-turut_",
        },
        { correct: false, label: "kata _merusak_ diganti dengan _menyerang_" },
        { correct: false, label: "kata _jika_ diganti dengan _karena_" },
      ],
    },
  },
};

export default item;
