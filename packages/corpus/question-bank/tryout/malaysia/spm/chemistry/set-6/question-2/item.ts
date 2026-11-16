import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$694\\text{ cm}^3$$, about $$9$$ times farther apart",
        },
        {
          correct: false,
          label: "$$694\\text{ cm}^3$$, about $$690$$ times farther apart",
        },
        {
          correct: false,
          label: "$$24.0\\text{ dm}^3$$, about $$29$$ times farther apart",
        },
        {
          correct: false,
          label: "$$1.39\\text{ dm}^3$$, about $$11$$ times farther apart",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$694\\text{ cm}^3$$, kira-kira $$9$$ kali lebih jauh",
        },
        {
          correct: false,
          label: "$$694\\text{ cm}^3$$, kira-kira $$690$$ kali lebih jauh",
        },
        {
          correct: false,
          label: "$$24.0\\text{ dm}^3$$, kira-kira $$29$$ kali lebih jauh",
        },
        {
          correct: false,
          label: "$$1.39\\text{ dm}^3$$, kira-kira $$11$$ kali lebih jauh",
        },
      ],
    },
  },
};

export default item;
