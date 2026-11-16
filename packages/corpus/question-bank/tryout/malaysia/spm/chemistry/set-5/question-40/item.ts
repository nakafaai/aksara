import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.965\\text{ g}$$, $$100$$ times more" },
        {
          correct: false,
          label: "$$0.965\\text{ g}$$, $$10\\,000$$ times more",
        },
        {
          correct: false,
          label: "$$9.65\\times10^{-7}\\text{ g}$$, $$100$$ times more",
        },
        { correct: false, label: "$$5.79\\text{ g}$$, $$100$$ times more" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.965\\text{ g}$$, $$100$$ kali lebih banyak",
        },
        {
          correct: false,
          label: "$$0.965\\text{ g}$$, $$10\\,000$$ kali lebih banyak",
        },
        {
          correct: false,
          label: "$$9.65\\times10^{-7}\\text{ g}$$, $$100$$ kali lebih banyak",
        },
        {
          correct: false,
          label: "$$5.79\\text{ g}$$, $$100$$ kali lebih banyak",
        },
      ],
    },
  },
};

export default item;
