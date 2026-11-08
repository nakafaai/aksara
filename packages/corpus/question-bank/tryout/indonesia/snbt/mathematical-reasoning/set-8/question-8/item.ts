import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "office-elevator",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "lantai 6" },
        { correct: false, label: "lantai 8" },
        { correct: false, label: "lantai 9" },
        { correct: false, label: "lantai 10" },
        { correct: false, label: "lantai 15" },
      ],
    },
  },
};

export default item;
