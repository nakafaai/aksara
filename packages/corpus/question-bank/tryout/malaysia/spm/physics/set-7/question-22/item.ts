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
          label: "$$0.17\\text{ m}$$, $$10\\text{ N}$$ and $$50\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.17\\text{ m}$$, $$12\\text{ N}$$ and $$25\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.040\\text{ m}$$, $$12\\text{ N}$$ and $$42\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$0.17\\text{ m}$$, $$12\\text{ N}$$ and $$63\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.17\\text{ m}$$, $$10\\text{ N}$$ dan $$50\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.17\\text{ m}$$, $$12\\text{ N}$$ dan $$25\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.040\\text{ m}$$, $$12\\text{ N}$$ dan $$42\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$0.17\\text{ m}$$, $$12\\text{ N}$$ dan $$63\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
