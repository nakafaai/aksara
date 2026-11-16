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
        { correct: false, label: "$$2.45$$ years" },
        { correct: false, label: "$$0.92$$ years" },
        { correct: true, label: "$$1.84$$ years" },
        { correct: false, label: "$$0.61$$ years" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.45$$ tahun" },
        { correct: false, label: "$$0.92$$ tahun" },
        { correct: true, label: "$$1.84$$ tahun" },
        { correct: false, label: "$$0.61$$ tahun" },
      ],
    },
  },
};

export default item;
