import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
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
            "$$0.010\\text{ N}$$, $$1.0\\text{ m s}^{-2}$$ and $$63\\text{ ms}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ N}$$, $$400\\text{ m s}^{-2}$$ and $$3.2\\text{ ms}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ N}$$, $$50\\text{ m s}^{-2}$$ and $$0.080\\text{ ms}$$",
        },
        {
          correct: true,
          label:
            "$$0.50\\text{ N}$$, $$50\\text{ m s}^{-2}$$ and $$8.9\\text{ ms}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.010\\text{ N}$$, $$1.0\\text{ m s}^{-2}$$ dan $$63\\text{ ms}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ N}$$, $$400\\text{ m s}^{-2}$$ dan $$3.2\\text{ ms}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ N}$$, $$50\\text{ m s}^{-2}$$ dan $$0.080\\text{ ms}$$",
        },
        {
          correct: true,
          label:
            "$$0.50\\text{ N}$$, $$50\\text{ m s}^{-2}$$ dan $$8.9\\text{ ms}$$",
        },
      ],
    },
  },
};

export default item;
