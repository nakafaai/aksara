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
          correct: false,
          label:
            "$$3.61\\times10^{23}$$ electrons, $$1.20\\times10^{23}$$ dative bonds",
        },
        {
          correct: false,
          label: "$$7.22\\times10^{23}$$ electrons, $$0$$ dative bonds",
        },
        {
          correct: false,
          label:
            "$$7.22\\times10^{23}$$ electrons, $$4.82\\times10^{23}$$ dative bonds",
        },
        {
          correct: true,
          label:
            "$$7.22\\times10^{23}$$ electrons, $$1.20\\times10^{23}$$ dative bonds",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.61\\times10^{23}$$ elektron, $$1.20\\times10^{23}$$ ikatan datif",
        },
        {
          correct: false,
          label: "$$7.22\\times10^{23}$$ elektron, $$0$$ ikatan datif",
        },
        {
          correct: false,
          label:
            "$$7.22\\times10^{23}$$ elektron, $$4.82\\times10^{23}$$ ikatan datif",
        },
        {
          correct: true,
          label:
            "$$7.22\\times10^{23}$$ elektron, $$1.20\\times10^{23}$$ ikatan datif",
        },
      ],
    },
  },
};

export default item;
