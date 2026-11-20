import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$100\\text{ N}$$, $$2.0\\text{ m}$$ and $$200\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$82\\text{ N}$$, $$2.0\\text{ m}$$ and $$160\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ N}$$, $$5.0\\text{ mm}$$ and $$0.59\\text{ J}$$",
        },
        {
          correct: true,
          label: "$$120\\text{ N}$$, $$2.0\\text{ m}$$ and $$240\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$100\\text{ N}$$, $$2.0\\text{ m}$$ dan $$200\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$82\\text{ N}$$, $$2.0\\text{ m}$$ dan $$160\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ N}$$, $$5.0\\text{ mm}$$ dan $$0.59\\text{ J}$$",
        },
        {
          correct: true,
          label: "$$120\\text{ N}$$, $$2.0\\text{ m}$$ dan $$240\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
