import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About $$1200\\text{ km}$$, so it never reaches $$2000\\text{ km}$$",
        },
        {
          correct: false,
          label: "About $$4300\\text{ km}$$, and $$0.70\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label: "About $$6000\\text{ km}$$, and $$1.0\\text{ km s}^{-1}$$",
        },
        {
          correct: true,
          label: "About $$4300\\text{ km}$$, and $$1.0\\text{ km s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira $$1200\\text{ km}$$, jadi ia tidak pernah sampai $$2000\\text{ km}$$",
        },
        {
          correct: false,
          label:
            "Kira-kira $$4300\\text{ km}$$, dan $$0.70\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label: "Kira-kira $$6000\\text{ km}$$, dan $$1.0\\text{ km s}^{-1}$$",
        },
        {
          correct: true,
          label: "Kira-kira $$4300\\text{ km}$$, dan $$1.0\\text{ km s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
