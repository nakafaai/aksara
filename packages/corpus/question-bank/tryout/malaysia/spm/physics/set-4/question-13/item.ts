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
          correct: true,
          label: "$$19^\\circ$$, and the wave is totally reflected",
        },
        {
          correct: false,
          label:
            "$$49^\\circ$$, and it passes into the deep water at $$28^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$19^\\circ$$, and it passes into the deep water at $$28^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$30^\\circ$$, and it passes into the deep water at $$45^\\circ$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$19^\\circ$$, dan gelombang dipantulkan sepenuhnya",
        },
        {
          correct: false,
          label: "$$49^\\circ$$, dan ia memasuki air dalam pada $$28^\\circ$$",
        },
        {
          correct: false,
          label: "$$19^\\circ$$, dan ia memasuki air dalam pada $$28^\\circ$$",
        },
        {
          correct: false,
          label: "$$30^\\circ$$, dan ia memasuki air dalam pada $$45^\\circ$$",
        },
      ],
    },
  },
};

export default item;
