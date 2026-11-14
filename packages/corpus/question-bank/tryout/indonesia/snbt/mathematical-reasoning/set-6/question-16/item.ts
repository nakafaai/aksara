import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "market-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$32\\%$$" },
        { correct: false, label: "$$40\\%$$" },
        { correct: false, label: "$$42\\%$$" },
        { correct: false, label: "$$46\\%$$" },
        { correct: true, label: "$$50\\%$$" },
      ],
    },
  },
};

export default item;
