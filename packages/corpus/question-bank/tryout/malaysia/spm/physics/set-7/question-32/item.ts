import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.5\\text{ kPa}$$, $$0.30\\text{ m}$$ and $$7500\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$25\\text{ kPa}$$, $$3.0\\text{ m}$$ and $$1500\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$6.3\\text{ kPa}$$, $$0.75\\text{ m}$$ and $$3000\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$25\\text{ kPa}$$, $$3.0\\text{ m}$$ and $$750\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.5\\text{ kPa}$$, $$0.30\\text{ m}$$ dan $$7500\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$25\\text{ kPa}$$, $$3.0\\text{ m}$$ dan $$1500\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$6.3\\text{ kPa}$$, $$0.75\\text{ m}$$ dan $$3000\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$25\\text{ kPa}$$, $$3.0\\text{ m}$$ dan $$750\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
