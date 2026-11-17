import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$40\\text{ A}$$, about $$12$$ days, and about $$39\\text{ kg}$$ of water",
        },
        {
          correct: false,
          label:
            "$$4.0 \\times 10^4\\text{ A}$$, about $$12$$ days, and about $$44\\text{ kg}$$ of water",
        },
        {
          correct: true,
          label:
            "$$4.0 \\times 10^4\\text{ A}$$, about $$12$$ days, and about $$39\\text{ kg}$$ of water",
        },
        {
          correct: false,
          label:
            "$$4.0 \\times 10^4\\text{ A}$$, about $$6$$ days, and about $$20\\text{ kg}$$ of water",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$40\\text{ A}$$, kira-kira $$12$$ hari, dan kira-kira $$39\\text{ kg}$$ air",
        },
        {
          correct: false,
          label:
            "$$4.0 \\times 10^4\\text{ A}$$, kira-kira $$12$$ hari, dan kira-kira $$44\\text{ kg}$$ air",
        },
        {
          correct: true,
          label:
            "$$4.0 \\times 10^4\\text{ A}$$, kira-kira $$12$$ hari, dan kira-kira $$39\\text{ kg}$$ air",
        },
        {
          correct: false,
          label:
            "$$4.0 \\times 10^4\\text{ A}$$, kira-kira $$6$$ hari, dan kira-kira $$20\\text{ kg}$$ air",
        },
      ],
    },
  },
};

export default item;
