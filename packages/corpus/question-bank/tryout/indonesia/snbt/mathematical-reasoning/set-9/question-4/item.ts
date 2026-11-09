import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "phone-credit",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0{,}5\\%$$" },
        { correct: false, label: "$$1\\%$$" },
        { correct: false, label: "$$1{,}2\\%$$" },
        { correct: false, label: "$$1{,}25\\%$$" },
        { correct: true, label: "$$1{,}5\\%$$" },
      ],
    },
  },
};

export default item;
