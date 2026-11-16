import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$26.8$$ hours" },
        { correct: false, label: "$$5.4$$ hours" },
        { correct: true, label: "$$10.7$$ hours" },
        { correct: false, label: "$$4.3$$ hours" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$26.8$$ jam" },
        { correct: false, label: "$$5.4$$ jam" },
        { correct: true, label: "$$10.7$$ jam" },
        { correct: false, label: "$$4.3$$ jam" },
      ],
    },
  },
};

export default item;
