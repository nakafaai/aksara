import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cell-division",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.0\\text{ hour}$$, $$80$$ cells",
        },
        {
          correct: false,
          label: "$$1.0\\text{ hour}$$, $$60$$ cells",
        },
        {
          correct: false,
          label: "$$1.0\\text{ hour}$$, $$20$$ cells",
        },
        {
          correct: false,
          label: "$$5.0\\text{ hours}$$, $$80$$ cells",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.0\\text{ jam}$$, $$80$$ sel",
        },
        {
          correct: false,
          label: "$$1.0\\text{ jam}$$, $$60$$ sel",
        },
        {
          correct: false,
          label: "$$1.0\\text{ jam}$$, $$20$$ sel",
        },
        {
          correct: false,
          label: "$$5.0\\text{ jam}$$, $$80$$ sel",
        },
      ],
    },
  },
};

export default item;
