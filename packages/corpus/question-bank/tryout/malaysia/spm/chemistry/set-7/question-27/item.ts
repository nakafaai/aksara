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
        {
          correct: false,
          label: "$$2$$ isomers, but-2-ene, $$3.70\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$3$$ isomers, but-2-ene, $$3.70\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3$$ isomers, but-1-ene, $$3.70\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3$$ isomers, methylpropene, $$3.70\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2$$ isomer, but-2-ena, $$3.70\\text{ g}$$",
        },
        { correct: true, label: "$$3$$ isomer, but-2-ena, $$3.70\\text{ g}$$" },
        {
          correct: false,
          label: "$$3$$ isomer, but-1-ena, $$3.70\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3$$ isomer, metilpropena, $$3.70\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
