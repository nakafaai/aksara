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
        {
          correct: false,
          label: "$$15$$ pollen grains and $$540$$ chromosomes",
        },
        {
          correct: true,
          label: "$$30$$ pollen grains and $$1080$$ chromosomes",
        },
        {
          correct: false,
          label: "$$30$$ pollen grains and $$720$$ chromosomes",
        },
        {
          correct: false,
          label: "$$60$$ pollen grains and $$1080$$ chromosomes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15$$ butir debunga dan $$540$$ kromosom" },
        { correct: true, label: "$$30$$ butir debunga dan $$1080$$ kromosom" },
        { correct: false, label: "$$30$$ butir debunga dan $$720$$ kromosom" },
        { correct: false, label: "$$60$$ butir debunga dan $$1080$$ kromosom" },
      ],
    },
  },
};

export default item;
