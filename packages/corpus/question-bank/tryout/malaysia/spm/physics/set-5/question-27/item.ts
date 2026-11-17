import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About $$16\\text{ km}$$, and still about $$16\\text{ km}$$",
        },
        {
          correct: false,
          label: "About $$16\\text{ km}$$, then about $$13\\text{ km}$$",
        },
        {
          correct: true,
          label: "About $$16\\text{ km}$$, then about $$20\\text{ km}$$",
        },
        {
          correct: false,
          label: "About $$41\\text{ km}$$, then about $$66\\text{ km}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira $$16\\text{ km}$$, dan masih kira-kira $$16\\text{ km}$$",
        },
        {
          correct: false,
          label:
            "Kira-kira $$16\\text{ km}$$, kemudian kira-kira $$13\\text{ km}$$",
        },
        {
          correct: true,
          label:
            "Kira-kira $$16\\text{ km}$$, kemudian kira-kira $$20\\text{ km}$$",
        },
        {
          correct: false,
          label:
            "Kira-kira $$41\\text{ km}$$, kemudian kira-kira $$66\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
