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
        { correct: false, label: "RM $$240$$, saving about RM $$84$$ a month" },
        { correct: true, label: "RM $$268$$, saving about RM $$101$$ a month" },
        {
          correct: false,
          label: "RM $$288$$, saving about RM $$101$$ a month",
        },
        { correct: false, label: "RM $$268$$, saving about RM $$94$$ a month" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "RM $$240$$, menjimatkan kira-kira RM $$84$$ sebulan",
        },
        {
          correct: true,
          label: "RM $$268$$, menjimatkan kira-kira RM $$101$$ sebulan",
        },
        {
          correct: false,
          label: "RM $$288$$, menjimatkan kira-kira RM $$101$$ sebulan",
        },
        {
          correct: false,
          label: "RM $$268$$, menjimatkan kira-kira RM $$94$$ sebulan",
        },
      ],
    },
  },
};

export default item;
