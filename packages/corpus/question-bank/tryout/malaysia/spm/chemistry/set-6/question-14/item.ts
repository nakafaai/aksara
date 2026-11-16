import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.80\\text{ g dm}^{-3}$$, it falls short of the label",
        },
        {
          correct: false,
          label: "$$96.0\\text{ g dm}^{-3}$$, it meets the label",
        },
        {
          correct: true,
          label: "$$48.0\\text{ g dm}^{-3}$$, it falls short of the label",
        },
        {
          correct: false,
          label: "$$48.0\\text{ g dm}^{-3}$$, it meets the label",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.80\\text{ g dm}^{-3}$$, ia tidak mencapai label",
        },
        {
          correct: false,
          label: "$$96.0\\text{ g dm}^{-3}$$, ia memenuhi label",
        },
        {
          correct: true,
          label: "$$48.0\\text{ g dm}^{-3}$$, ia tidak mencapai label",
        },
        {
          correct: false,
          label: "$$48.0\\text{ g dm}^{-3}$$, ia memenuhi label",
        },
      ],
    },
  },
};

export default item;
