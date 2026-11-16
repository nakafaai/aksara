import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.02\\times10^{20}$$ molecules, $$5.42\\times10^{22}$$ links",
        },
        {
          correct: false,
          label:
            "$$3.61\\times10^{22}$$ molecules, $$5.42\\times10^{22}$$ links",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{20}$$ molecules, $$1.08\\times10^{23}$$ links",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{20}$$ molecules, $$3.61\\times10^{22}$$ links",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.02\\times10^{20}$$ molekul, $$5.42\\times10^{22}$$ sambungan",
        },
        {
          correct: false,
          label:
            "$$3.61\\times10^{22}$$ molekul, $$5.42\\times10^{22}$$ sambungan",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{20}$$ molekul, $$1.08\\times10^{23}$$ sambungan",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{20}$$ molekul, $$3.61\\times10^{22}$$ sambungan",
        },
      ],
    },
  },
};

export default item;
