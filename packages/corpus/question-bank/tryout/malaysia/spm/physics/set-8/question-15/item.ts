import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
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
            "$$1.0\\text{ m}$$, $$5.6\\times10^{-7}$$, and the whistle spreads more",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ m}$$, $$1.8\\times10^{6}$$, and the voice spreads more",
        },
        {
          correct: true,
          label:
            "$$1.0\\text{ m}$$, $$5.6\\times10^{-7}$$, and the voice spreads more",
        },
        {
          correct: false,
          label:
            "$$0.0029\\text{ m}$$, $$5.6\\times10^{-7}$$, and the whistle spreads more",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.0\\text{ m}$$, $$5.6\\times10^{-7}$$, dan wisel tersebar lebih luas",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ m}$$, $$1.8\\times10^{6}$$, dan suara tersebar lebih luas",
        },
        {
          correct: true,
          label:
            "$$1.0\\text{ m}$$, $$5.6\\times10^{-7}$$, dan suara tersebar lebih luas",
        },
        {
          correct: false,
          label:
            "$$0.0029\\text{ m}$$, $$5.6\\times10^{-7}$$, dan wisel tersebar lebih luas",
        },
      ],
    },
  },
};

export default item;
