import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Both give $$240\\text{ cm}^3$$, and II is faster",
        },
        {
          correct: true,
          label:
            "I gives $$240\\text{ cm}^3$$ and II gives $$216\\text{ cm}^3$$, and II is faster",
        },
        {
          correct: false,
          label:
            "I gives $$240\\text{ cm}^3$$ and II gives $$216\\text{ cm}^3$$, and II is slower",
        },
        {
          correct: false,
          label:
            "I gives $$240\\text{ cm}^3$$ and II gives $$264\\text{ cm}^3$$, and II is faster",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kedua-duanya memberi $$240\\text{ cm}^3$$, dan II lebih cepat",
        },
        {
          correct: true,
          label:
            "I memberi $$240\\text{ cm}^3$$ dan II memberi $$216\\text{ cm}^3$$, dan II lebih cepat",
        },
        {
          correct: false,
          label:
            "I memberi $$240\\text{ cm}^3$$ dan II memberi $$216\\text{ cm}^3$$, dan II lebih perlahan",
        },
        {
          correct: false,
          label:
            "I memberi $$240\\text{ cm}^3$$ dan II memberi $$264\\text{ cm}^3$$, dan II lebih cepat",
        },
      ],
    },
  },
};

export default item;
