import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The presenter, by about $$0.1\\text{ ms}$$, and about $$0.03\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "The listener, by about $$23\\text{ ms}$$, and about $$7.8\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "The listener, by about $$29\\text{ ms}$$, and about $$0.03\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "The listener, by about $$23\\text{ ms}$$, and about $$2.0\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penyampai, kira-kira $$0.1\\text{ ms}$$ lebih awal, dan kira-kira $$0.03\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "Pendengar, kira-kira $$23\\text{ ms}$$ lebih awal, dan kira-kira $$7.8\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "Pendengar, kira-kira $$29\\text{ ms}$$ lebih awal, dan kira-kira $$0.03\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "Pendengar, kira-kira $$23\\text{ ms}$$ lebih awal, dan kira-kira $$2.0\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
