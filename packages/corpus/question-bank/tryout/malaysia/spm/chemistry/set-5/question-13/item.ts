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
            "$$6.02\\times10^{23}$$ in diamond, $$4.52\\times10^{23}$$ in graphite",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{24}$$ in diamond, $$9.03\\times10^{23}$$ in graphite",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{23}$$ in diamond, $$6.02\\times10^{23}$$ in graphite",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{23}$$ in diamond, $$2.26\\times10^{23}$$ in graphite",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.02\\times10^{23}$$ dalam intan, $$4.52\\times10^{23}$$ dalam grafit",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{24}$$ dalam intan, $$9.03\\times10^{23}$$ dalam grafit",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{23}$$ dalam intan, $$6.02\\times10^{23}$$ dalam grafit",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{23}$$ dalam intan, $$2.26\\times10^{23}$$ dalam grafit",
        },
      ],
    },
  },
};

export default item;
