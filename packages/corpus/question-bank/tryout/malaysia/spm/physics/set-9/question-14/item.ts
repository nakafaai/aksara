import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$35^\\circ$$, and they enter the deep water at $$41^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$35^\\circ$$, and they travel along the boundary at $$90^\\circ$$",
        },
        {
          correct: true,
          label: "$$35^\\circ$$, and they are totally reflected",
        },
        {
          correct: false,
          label: "$$38^\\circ$$, and they are totally reflected",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$35^\\circ$$, dan ia memasuki air dalam pada $$41^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$35^\\circ$$, dan ia bergerak di sepanjang sempadan pada $$90^\\circ$$",
        },
        {
          correct: true,
          label: "$$35^\\circ$$, dan ia dipantulkan sepenuhnya",
        },
        {
          correct: false,
          label: "$$38^\\circ$$, dan ia dipantulkan sepenuhnya",
        },
      ],
    },
  },
};

export default item;
