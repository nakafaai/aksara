import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "sexual-reproduction-in-flowering-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15$$ pollen grains and $$30$$ male gametes" },
        { correct: true, label: "$$30$$ pollen grains and $$60$$ male gametes" },
        { correct: false, label: "$$30$$ pollen grains and $$30$$ male gametes" },
        { correct: false, label: "$$60$$ pollen grains and $$60$$ male gametes" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15$$ butir debunga dan $$30$$ gamet jantan" },
        { correct: true, label: "$$30$$ butir debunga dan $$60$$ gamet jantan" },
        { correct: false, label: "$$30$$ butir debunga dan $$30$$ gamet jantan" },
        { correct: false, label: "$$60$$ butir debunga dan $$60$$ gamet jantan" },
      ],
    },
  },
};

export default item;
