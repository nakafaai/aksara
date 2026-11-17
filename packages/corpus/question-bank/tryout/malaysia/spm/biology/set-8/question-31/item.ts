import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "environmental-sustainability",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1200$$ hectares" },
        { correct: false, label: "$$840$$ hectares" },
        { correct: false, label: "$$4400$$ hectares" },
        { correct: false, label: "$$600$$ hectares" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1200$$ hektar" },
        { correct: false, label: "$$840$$ hektar" },
        { correct: false, label: "$$4400$$ hektar" },
        { correct: false, label: "$$600$$ hektar" },
      ],
    },
  },
};

export default item;
