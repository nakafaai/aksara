import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4$$ combinations, and $$3$$ tests" },
        { correct: false, label: "$$3$$ combinations, and $$2$$ tests" },
        {
          correct: false,
          label:
            "$$4$$ combinations, and $$1$$ test with all three inputs at $$1$$",
        },
        { correct: true, label: "$$4$$ combinations, and $$2$$ tests" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4$$ gabungan, dan $$3$$ ujian" },
        { correct: false, label: "$$3$$ gabungan, dan $$2$$ ujian" },
        {
          correct: false,
          label:
            "$$4$$ gabungan, dan $$1$$ ujian dengan ketiga-tiga input pada $$1$$",
        },
        { correct: true, label: "$$4$$ gabungan, dan $$2$$ ujian" },
      ],
    },
  },
};

export default item;
