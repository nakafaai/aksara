import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "electricity-tariff",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$50<x<300$$" },
        { correct: false, label: "$$x>50$$" },
        { correct: false, label: "$$100<x<300$$" },
        { correct: false, label: "$$x<300$$" },
        { correct: false, label: "$$50<x<100$$" },
      ],
    },
  },
};

export default item;
