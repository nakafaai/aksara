import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$55.6$$ tonnes, $$12\\,000\\text{ m}^3$$" },
        { correct: false, label: "$$22.5$$ tonnes, $$6000\\text{ m}^3$$" },
        { correct: false, label: "$$27.8$$ tonnes, $$6.0\\text{ m}^3$$" },
        { correct: true, label: "$$27.8$$ tonnes, $$6000\\text{ m}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$55.6$$ tan, $$12\\,000\\text{ m}^3$$" },
        { correct: false, label: "$$22.5$$ tan, $$6000\\text{ m}^3$$" },
        { correct: false, label: "$$27.8$$ tan, $$6.0\\text{ m}^3$$" },
        { correct: true, label: "$$27.8$$ tan, $$6000\\text{ m}^3$$" },
      ],
    },
  },
};

export default item;
