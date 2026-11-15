import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "relay-ride",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}865{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}750{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{,}025{,}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}875{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}375{,}000$$",
        },
      ],
    },
  },
};

export default item;
