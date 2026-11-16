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
            "$$2.68\\text{ g}$$ of solid, $$3.01 \\times 10^{22}$$ dative bonds, and $$9.03 \\times 10^{22}$$ $$\\text{X–Y}$$ bonds in all",
        },
        {
          correct: false,
          label:
            "$$1.34\\text{ g}$$ of solid, $$3.01 \\times 10^{22}$$ dative bonds, and $$1.20 \\times 10^{23}$$ $$\\text{X–Y}$$ bonds in all",
        },
        {
          correct: true,
          label:
            "$$2.68\\text{ g}$$ of solid, $$3.01 \\times 10^{22}$$ dative bonds, and $$1.20 \\times 10^{23}$$ $$\\text{X–Y}$$ bonds in all",
        },
        {
          correct: false,
          label:
            "$$2.68\\text{ g}$$ of solid, no dative bonds, and $$9.03 \\times 10^{22}$$ $$\\text{X–Y}$$ bonds in all",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.68\\text{ g}$$ pepejal, $$3.01 \\times 10^{22}$$ ikatan datif, dan $$9.03 \\times 10^{22}$$ ikatan $$\\text{X–Y}$$ kesemuanya",
        },
        {
          correct: false,
          label:
            "$$1.34\\text{ g}$$ pepejal, $$3.01 \\times 10^{22}$$ ikatan datif, dan $$1.20 \\times 10^{23}$$ ikatan $$\\text{X–Y}$$ kesemuanya",
        },
        {
          correct: true,
          label:
            "$$2.68\\text{ g}$$ pepejal, $$3.01 \\times 10^{22}$$ ikatan datif, dan $$1.20 \\times 10^{23}$$ ikatan $$\\text{X–Y}$$ kesemuanya",
        },
        {
          correct: false,
          label:
            "$$2.68\\text{ g}$$ pepejal, tiada ikatan datif, dan $$9.03 \\times 10^{22}$$ ikatan $$\\text{X–Y}$$ kesemuanya",
        },
      ],
    },
  },
};

export default item;
