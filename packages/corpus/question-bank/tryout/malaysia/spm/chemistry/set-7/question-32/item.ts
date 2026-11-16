import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.0821$$ tonnes" },
        { correct: false, label: "$$1.64$$ tonnes" },
        { correct: true, label: "$$1.56$$ tonnes" },
        { correct: false, label: "$$1.48$$ tonnes" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.0821$$ tan" },
        { correct: false, label: "$$1.64$$ tan" },
        { correct: true, label: "$$1.56$$ tan" },
        { correct: false, label: "$$1.48$$ tan" },
      ],
    },
  },
};

export default item;
