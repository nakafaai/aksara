import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "aquarium-salinity",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$34\\text{ g/L}$$" },
        { correct: false, label: "$$34{,}2\\text{ g/L}$$" },
        { correct: false, label: "$$35\\text{ g/L}$$" },
        { correct: true, label: "$$41\\text{ g/L}$$" },
        { correct: false, label: "$$42{,}5\\text{ g/L}$$" },
      ],
    },
  },
};

export default item;
