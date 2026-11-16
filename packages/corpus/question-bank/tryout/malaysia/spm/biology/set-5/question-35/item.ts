import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "genetic-technology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "About $$1500$$ base pairs" },
        { correct: true, label: "About $$1400$$ base pairs" },
        { correct: false, label: "About $$2800$$ base pairs" },
        { correct: false, label: "About $$700$$ base pairs" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira $$1500$$ pasangan bes" },
        { correct: true, label: "Kira-kira $$1400$$ pasangan bes" },
        { correct: false, label: "Kira-kira $$2800$$ pasangan bes" },
        { correct: false, label: "Kira-kira $$700$$ pasangan bes" },
      ],
    },
  },
};

export default item;
