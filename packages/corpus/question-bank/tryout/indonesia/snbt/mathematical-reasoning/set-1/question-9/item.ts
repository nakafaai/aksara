import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "drug-dose",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$100\\text{ mg}$$" },
        { correct: true, label: "$$175\\text{ mg}$$" },
        { correct: false, label: "$$262{,}5\\text{ mg}$$" },
        { correct: false, label: "$$350\\text{ mg}$$" },
        { correct: false, label: "$$525\\text{ mg}$$" },
      ],
    },
  },
};

export default item;
