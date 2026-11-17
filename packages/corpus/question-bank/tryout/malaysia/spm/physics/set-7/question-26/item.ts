import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.6\\times10^{5}\\text{ Pa}$$, floor $$6$$, floor $$5$$ and $$50\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{5}\\text{ Pa}$$, floor $$6$$, floor $$6$$ and $$50\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{5}\\text{ Pa}$$, floor $$6$$, no floor and $$5.0\\text{ m}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.6\\times10^{5}\\text{ Pa}$$, floor $$6$$, floor $$5$$ and $$50\\text{ m}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.6\\times10^{5}\\text{ Pa}$$, tingkat $$6$$, tingkat $$5$$ dan $$50\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{5}\\text{ Pa}$$, tingkat $$6$$, tingkat $$6$$ dan $$50\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{5}\\text{ Pa}$$, tingkat $$6$$, tiada tingkat dan $$5.0\\text{ m}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.6\\times10^{5}\\text{ Pa}$$, tingkat $$6$$, tingkat $$5$$ dan $$50\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
