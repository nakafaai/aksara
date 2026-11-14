import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "class-timetable",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12$$" },
        { correct: true, label: "$$14$$" },
        { correct: false, label: "$$16$$" },
        { correct: false, label: "$$18$$" },
        { correct: false, label: "$$21$$" },
      ],
    },
  },
};

export default item;
