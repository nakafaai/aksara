import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$+7$$ to $$+2$$, $$4.45\\text{ g}$$, $$17.8\\%$$",
        },
        {
          correct: false,
          label: "$$+7$$ to $$+2$$, $$12.2\\text{ g}$$, $$48.8\\%$$",
        },
        {
          correct: true,
          label: "$$+7$$ to $$+2$$, $$22.2\\text{ g}$$, $$89.0\\%$$",
        },
        {
          correct: false,
          label: "$$+6$$ to $$+3$$, $$22.2\\text{ g}$$, $$89.0\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$+7$$ kepada $$+2$$, $$4.45\\text{ g}$$, $$17.8\\%$$",
        },
        {
          correct: false,
          label: "$$+7$$ kepada $$+2$$, $$12.2\\text{ g}$$, $$48.8\\%$$",
        },
        {
          correct: true,
          label: "$$+7$$ kepada $$+2$$, $$22.2\\text{ g}$$, $$89.0\\%$$",
        },
        {
          correct: false,
          label: "$$+6$$ kepada $$+3$$, $$22.2\\text{ g}$$, $$89.0\\%$$",
        },
      ],
    },
  },
};

export default item;
