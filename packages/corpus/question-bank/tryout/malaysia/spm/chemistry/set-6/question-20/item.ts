import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$9.17\\times10^{21}$$ gold atoms, $$2.35\\times10^{21}$$ copper atoms",
        },
        {
          correct: true,
          label:
            "$$9.17\\times10^{21}$$ gold atoms, $$7.05\\times10^{21}$$ copper atoms",
        },
        {
          correct: false,
          label:
            "$$2.20\\times10^{20}$$ gold atoms, $$7.05\\times10^{21}$$ copper atoms",
        },
        {
          correct: false,
          label:
            "$$1.22\\times10^{22}$$ gold atoms, $$7.05\\times10^{21}$$ copper atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$9.17\\times10^{21}$$ atom emas, $$2.35\\times10^{21}$$ atom kuprum",
        },
        {
          correct: true,
          label:
            "$$9.17\\times10^{21}$$ atom emas, $$7.05\\times10^{21}$$ atom kuprum",
        },
        {
          correct: false,
          label:
            "$$2.20\\times10^{20}$$ atom emas, $$7.05\\times10^{21}$$ atom kuprum",
        },
        {
          correct: false,
          label:
            "$$1.22\\times10^{22}$$ atom emas, $$7.05\\times10^{21}$$ atom kuprum",
        },
      ],
    },
  },
};

export default item;
