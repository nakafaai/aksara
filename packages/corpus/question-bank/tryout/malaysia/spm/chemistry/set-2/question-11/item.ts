import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$240$$, $$240$$ and $$240\\text{ cm}^3$$" },
        { correct: true, label: "$$240$$, $$240$$ and $$60\\text{ cm}^3$$" },
        { correct: false, label: "$$240$$, $$240$$ and $$120\\text{ cm}^3$$" },
        { correct: false, label: "$$240$$, $$480$$ and $$60\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$240$$, $$240$$ dan $$240\\text{ cm}^3$$" },
        { correct: true, label: "$$240$$, $$240$$ dan $$60\\text{ cm}^3$$" },
        { correct: false, label: "$$240$$, $$240$$ dan $$120\\text{ cm}^3$$" },
        { correct: false, label: "$$240$$, $$480$$ dan $$60\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
