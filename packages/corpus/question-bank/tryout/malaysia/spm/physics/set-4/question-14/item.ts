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
          label: "$$70\\text{ km}$$, and about $$5.7$$ minutes",
        },
        {
          correct: false,
          label: "$$206\\text{ km}$$, and about $$16.4$$ minutes",
        },
        {
          correct: true,
          label: "$$206\\text{ km}$$, and about $$16.7$$ minutes",
        },
        {
          correct: false,
          label: "$$206\\text{ km}$$, and about $$17.2$$ minutes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$70\\text{ km}$$, dan kira-kira $$5.7$$ minit",
        },
        {
          correct: false,
          label: "$$206\\text{ km}$$, dan kira-kira $$16.4$$ minit",
        },
        {
          correct: true,
          label: "$$206\\text{ km}$$, dan kira-kira $$16.7$$ minit",
        },
        {
          correct: false,
          label: "$$206\\text{ km}$$, dan kira-kira $$17.2$$ minit",
        },
      ],
    },
  },
};

export default item;
