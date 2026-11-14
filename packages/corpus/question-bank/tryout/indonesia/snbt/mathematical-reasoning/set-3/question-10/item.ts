import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bacteria-harvest",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "pada $$t=5$$" },
        { correct: false, label: "pada $$t=6$$" },
        { correct: false, label: "pada $$t=9$$" },
        { correct: true, label: "pada $$t=10$$" },
        {
          correct: false,
          label: "Tidak pernah ada bakteri yang mati karena tabung penuh.",
        },
      ],
    },
  },
};

export default item;
