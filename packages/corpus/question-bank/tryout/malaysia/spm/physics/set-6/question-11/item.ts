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
          label: "$$72^\\circ\\text{C}$$, and $$150\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$345^\\circ\\text{C}$$, and $$130\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$72^\\circ\\text{C}$$, and $$130\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$72^\\circ\\text{C}$$, and $$65\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$72^\\circ\\text{C}$$, dan $$150\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$345^\\circ\\text{C}$$, dan $$130\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$72^\\circ\\text{C}$$, dan $$130\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$72^\\circ\\text{C}$$, dan $$65\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
