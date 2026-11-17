import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1000\\text{ cm}^3$$, pH higher than $$3$$",
        },
        { correct: true, label: "$$990\\text{ cm}^3$$, pH higher than $$3$$" },
        { correct: false, label: "$$990\\text{ cm}^3$$, pH equal to $$3$$" },
        { correct: false, label: "$$20\\text{ cm}^3$$, pH higher than $$3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1000\\text{ cm}^3$$, pH lebih tinggi daripada $$3$$",
        },
        {
          correct: true,
          label: "$$990\\text{ cm}^3$$, pH lebih tinggi daripada $$3$$",
        },
        { correct: false, label: "$$990\\text{ cm}^3$$, pH sama dengan $$3$$" },
        {
          correct: false,
          label: "$$20\\text{ cm}^3$$, pH lebih tinggi daripada $$3$$",
        },
      ],
    },
  },
};

export default item;
