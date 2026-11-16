import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "2.8 g of nitrogen gas, $$1.20 \\times 10^{23}$$ atoms",
        },
        {
          correct: false,
          label: "3.4 g of ammonia, $$4.82 \\times 10^{23}$$ atoms",
        },
        {
          correct: true,
          label: "4.6 g of ethanol, $$5.42 \\times 10^{23}$$ atoms",
        },
        {
          correct: false,
          label: "1.6 g of methane, $$3.01 \\times 10^{23}$$ atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "2.8 g gas nitrogen, $$1.20 \\times 10^{23}$$ atom",
        },
        {
          correct: false,
          label: "3.4 g ammonia, $$4.82 \\times 10^{23}$$ atom",
        },
        { correct: true, label: "4.6 g etanol, $$5.42 \\times 10^{23}$$ atom" },
        {
          correct: false,
          label: "1.6 g metana, $$3.01 \\times 10^{23}$$ atom",
        },
      ],
    },
  },
};

export default item;
