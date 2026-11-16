import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$112^\\circ\\text{C}$$; $$60\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$100^\\circ\\text{C}$$; $$60\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$100^\\circ\\text{C}$$; $$51\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$100^\\circ\\text{C}$$; $$45\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$112^\\circ\\text{C}$$; $$60\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$100^\\circ\\text{C}$$; $$60\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$100^\\circ\\text{C}$$; $$51\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$100^\\circ\\text{C}$$; $$45\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
