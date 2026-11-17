import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About $$0.8\\text{ s}$$, and $$2.5 \\times 10^{18}$$ electrons",
        },
        {
          correct: true,
          label: "About $$13$$ minutes, and $$2.5 \\times 10^{18}$$ electrons",
        },
        {
          correct: false,
          label: "About $$14$$ minutes, and $$2.6 \\times 10^{18}$$ electrons",
        },
        {
          correct: false,
          label: "About $$8.3$$ minutes, and $$1.6 \\times 10^{18}$$ electrons",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira $$0.8\\text{ s}$$, dan $$2.5 \\times 10^{18}$$ elektron",
        },
        {
          correct: true,
          label: "Kira-kira $$13$$ minit, dan $$2.5 \\times 10^{18}$$ elektron",
        },
        {
          correct: false,
          label: "Kira-kira $$14$$ minit, dan $$2.6 \\times 10^{18}$$ elektron",
        },
        {
          correct: false,
          label:
            "Kira-kira $$8.3$$ minit, dan $$1.6 \\times 10^{18}$$ elektron",
        },
      ],
    },
  },
};

export default item;
