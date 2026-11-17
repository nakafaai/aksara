import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "About $$4.0\\text{ h}$$, and $$5$$ times a day",
        },
        {
          correct: false,
          label: "About $$4.0\\text{ h}$$, and $$6$$ times a day",
        },
        {
          correct: false,
          label: "About $$1.4\\text{ h}$$, and $$16$$ times a day",
        },
        {
          correct: false,
          label: "About $$4.0\\text{ h}$$, and $$7$$ times a day",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Kira-kira $$4.0\\text{ h}$$, dan $$5$$ kali sehari",
        },
        {
          correct: false,
          label: "Kira-kira $$4.0\\text{ h}$$, dan $$6$$ kali sehari",
        },
        {
          correct: false,
          label: "Kira-kira $$1.4\\text{ h}$$, dan $$16$$ kali sehari",
        },
        {
          correct: false,
          label: "Kira-kira $$4.0\\text{ h}$$, dan $$7$$ kali sehari",
        },
      ],
    },
  },
};

export default item;
