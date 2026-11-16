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
          correct: true,
          label: "$$50$$ per ion, $$6.02\\times10^{23}$$ in total",
        },
        {
          correct: false,
          label: "$$46$$ per ion, $$5.54\\times10^{23}$$ in total",
        },
        {
          correct: false,
          label: "$$50$$ per ion, $$6.65\\times10^{23}$$ in total",
        },
        {
          correct: false,
          label: "$$48$$ per ion, $$5.78\\times10^{23}$$ in total",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$50$$ bagi setiap ion, $$6.02\\times10^{23}$$ kesemuanya",
        },
        {
          correct: false,
          label: "$$46$$ bagi setiap ion, $$5.54\\times10^{23}$$ kesemuanya",
        },
        {
          correct: false,
          label: "$$50$$ bagi setiap ion, $$6.65\\times10^{23}$$ kesemuanya",
        },
        {
          correct: false,
          label: "$$48$$ bagi setiap ion, $$5.78\\times10^{23}$$ kesemuanya",
        },
      ],
    },
  },
};

export default item;
