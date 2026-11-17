import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$12\\text{ kN}$$, $$0\\text{ m s}^{-2}$$, $$2.0\\text{ m s}^{-1}$$ and $$2.2\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$9.2\\text{ kN}$$, $$4.2\\times10^{-3}\\text{ m s}^{-2}$$, $$2.2\\text{ m s}^{-1}$$ and $$2.4\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$9.2\\text{ kN}$$, $$2.3\\times10^{-2}\\text{ m s}^{-2}$$, $$2.2\\text{ m s}^{-1}$$ and $$2.4\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$9.2\\text{ kN}$$, $$4.2\\times10^{-3}\\text{ m s}^{-2}$$, $$2.5\\text{ m s}^{-1}$$ and $$2.9\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$12\\text{ kN}$$, $$0\\text{ m s}^{-2}$$, $$2.0\\text{ m s}^{-1}$$ dan $$2.2\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$9.2\\text{ kN}$$, $$4.2\\times10^{-3}\\text{ m s}^{-2}$$, $$2.2\\text{ m s}^{-1}$$ dan $$2.4\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$9.2\\text{ kN}$$, $$2.3\\times10^{-2}\\text{ m s}^{-2}$$, $$2.2\\text{ m s}^{-1}$$ dan $$2.4\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$9.2\\text{ kN}$$, $$4.2\\times10^{-3}\\text{ m s}^{-2}$$, $$2.5\\text{ m s}^{-1}$$ dan $$2.9\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
