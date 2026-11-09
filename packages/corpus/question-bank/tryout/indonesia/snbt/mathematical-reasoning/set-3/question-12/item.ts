import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "class-election",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Andra menang dengan selisih 12 suara." },
        { correct: false, label: "Andra menang dengan selisih 24 suara." },
        { correct: false, label: "Kedua kandidat memperoleh suara yang sama." },
        { correct: false, label: "Bunga menang dengan selisih 12 suara." },
        { correct: false, label: "Bunga menang dengan selisih 6 suara." },
      ],
    },
  },
};

export default item;
