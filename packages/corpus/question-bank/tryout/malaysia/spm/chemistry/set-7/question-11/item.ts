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
          label: "$$2.22\\times10^{19}$$ ions, $$763$$ crystals",
        },
        {
          correct: false,
          label: "$$4.45\\times10^{22}$$ ions, $$0.763$$ crystals",
        },
        {
          correct: true,
          label: "$$4.45\\times10^{19}$$ ions, $$763$$ crystals",
        },
        {
          correct: false,
          label: "$$4.45\\times10^{19}$$ ions, $$381$$ crystals",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.22\\times10^{19}$$ ion, $$763$$ hablur" },
        {
          correct: false,
          label: "$$4.45\\times10^{22}$$ ion, $$0.763$$ hablur",
        },
        { correct: true, label: "$$4.45\\times10^{19}$$ ion, $$763$$ hablur" },
        { correct: false, label: "$$4.45\\times10^{19}$$ ion, $$381$$ hablur" },
      ],
    },
  },
};

export default item;
