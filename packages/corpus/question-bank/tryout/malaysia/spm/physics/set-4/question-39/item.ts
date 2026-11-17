import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "About $$21$$ hours" },
        { correct: true, label: "About $$6.4$$ hours" },
        { correct: false, label: "About $$71$$ hours" },
        { correct: false, label: "About $$1500$$ hours" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira $$21$$ jam" },
        { correct: true, label: "Kira-kira $$6.4$$ jam" },
        { correct: false, label: "Kira-kira $$71$$ jam" },
        { correct: false, label: "Kira-kira $$1500$$ jam" },
      ],
    },
  },
};

export default item;
