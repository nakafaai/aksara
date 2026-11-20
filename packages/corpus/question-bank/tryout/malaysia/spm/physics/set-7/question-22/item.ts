import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.0\\text{ kN}$$, $$250\\text{ N}$$ and $$0.81\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ kN}$$, $$500\\text{ N}$$ and $$0.62\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ kN}$$, $$250\\text{ N}$$ and $$0.40\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$2.0\\text{ kN}$$, $$500\\text{ N}$$ and $$0.40\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.0\\text{ kN}$$, $$250\\text{ N}$$ dan $$0.81\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ kN}$$, $$500\\text{ N}$$ dan $$0.62\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ kN}$$, $$250\\text{ N}$$ dan $$0.40\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$2.0\\text{ kN}$$, $$500\\text{ N}$$ dan $$0.40\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
