import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$8.67\\times10^{23}$$ neutrons, $$4.32\\text{ dm}^3$$, $$2.88\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{24}$$ neutrons, $$4.80\\text{ dm}^3$$, $$3.20\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.08\\times10^{24}$$ neutrons, $$2.16\\text{ dm}^3$$, $$5.76\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$1.08\\times10^{24}$$ neutrons, $$4.32\\text{ dm}^3$$, $$2.88\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$8.67\\times10^{23}$$ neutron, $$4.32\\text{ dm}^3$$, $$2.88\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{24}$$ neutron, $$4.80\\text{ dm}^3$$, $$3.20\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.08\\times10^{24}$$ neutron, $$2.16\\text{ dm}^3$$, $$5.76\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$1.08\\times10^{24}$$ neutron, $$4.32\\text{ dm}^3$$, $$2.88\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
