import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.2\\text{ cm}$$, and $$51$$ counts per minute",
        },
        {
          correct: false,
          label: "$$5.0\\text{ cm}$$, and $$50$$ counts per minute",
        },
        {
          correct: false,
          label: "$$5.0\\text{ cm}$$, and $$220$$ counts per minute",
        },
        {
          correct: true,
          label: "$$5.0\\text{ cm}$$, and $$70$$ counts per minute",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.2\\text{ cm}$$, dan $$51$$ bilangan seminit",
        },
        {
          correct: false,
          label: "$$5.0\\text{ cm}$$, dan $$50$$ bilangan seminit",
        },
        {
          correct: false,
          label: "$$5.0\\text{ cm}$$, dan $$220$$ bilangan seminit",
        },
        {
          correct: true,
          label: "$$5.0\\text{ cm}$$, dan $$70$$ bilangan seminit",
        },
      ],
    },
  },
};

export default item;
