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
          label: "$$12\\text{ kN}$$ and $$0\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$9.2\\text{ kN}$$ and $$4.2\\times10^{-3}\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$9.2\\text{ kN}$$ and $$2.3\\times10^{-2}\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$9.2\\text{ kN}$$ and $$4.2\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12\\text{ kN}$$ dan $$0\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$9.2\\text{ kN}$$ dan $$4.2\\times10^{-3}\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$9.2\\text{ kN}$$ dan $$2.3\\times10^{-2}\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$9.2\\text{ kN}$$ dan $$4.2\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
