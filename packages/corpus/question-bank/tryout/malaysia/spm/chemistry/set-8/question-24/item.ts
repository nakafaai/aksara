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
        {
          correct: false,
          label: "$$1.00\\times10^{-5}\\text{ mol}$$, $$24$$ ppm",
        },
        {
          correct: false,
          label: "$$2.50\\times10^{-5}\\text{ mol}$$, $$600$$ ppm",
        },
        {
          correct: true,
          label: "$$2.50\\times10^{-5}\\text{ mol}$$, $$60$$ ppm",
        },
        {
          correct: false,
          label: "$$4.00\\times10^{-6}\\text{ mol}$$, $$9.6$$ ppm",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.00\\times10^{-5}\\text{ mol}$$, $$24$$ ppm",
        },
        {
          correct: false,
          label: "$$2.50\\times10^{-5}\\text{ mol}$$, $$600$$ ppm",
        },
        {
          correct: true,
          label: "$$2.50\\times10^{-5}\\text{ mol}$$, $$60$$ ppm",
        },
        {
          correct: false,
          label: "$$4.00\\times10^{-6}\\text{ mol}$$, $$9.6$$ ppm",
        },
      ],
    },
  },
};

export default item;
