import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.4\\times10^{9}$$ years, $$17.1\\text{ mg}$$ and $$8.28\\text{ mg}$$",
        },
        {
          correct: true,
          label:
            "$$1.4\\times10^{9}$$ years, $$18.8\\text{ mg}$$ and $$8.28\\text{ mg}$$",
        },
        {
          correct: false,
          label:
            "$$2.1\\times10^{9}$$ years, $$18.8\\text{ mg}$$ and $$8.28\\text{ mg}$$",
        },
        {
          correct: false,
          label:
            "$$1.4\\times10^{9}$$ years, $$18.8\\text{ mg}$$ and $$6.21\\text{ mg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.4\\times10^{9}$$ tahun, $$17.1\\text{ mg}$$ dan $$8.28\\text{ mg}$$",
        },
        {
          correct: true,
          label:
            "$$1.4\\times10^{9}$$ tahun, $$18.8\\text{ mg}$$ dan $$8.28\\text{ mg}$$",
        },
        {
          correct: false,
          label:
            "$$2.1\\times10^{9}$$ tahun, $$18.8\\text{ mg}$$ dan $$8.28\\text{ mg}$$",
        },
        {
          correct: false,
          label:
            "$$1.4\\times10^{9}$$ tahun, $$18.8\\text{ mg}$$ dan $$6.21\\text{ mg}$$",
        },
      ],
    },
  },
};

export default item;
