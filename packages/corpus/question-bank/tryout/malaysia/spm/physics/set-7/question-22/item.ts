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
          label: "$$0.17\\text{ m}$$, $$40\\%$$ and $$12\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.17\\text{ m}$$, $$60\\%$$ and $$10\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.040\\text{ m}$$, $$40\\%$$ and $$12\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$0.17\\text{ m}$$, $$60\\%$$ and $$12\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.17\\text{ m}$$, $$40\\%$$ dan $$12\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.17\\text{ m}$$, $$60\\%$$ dan $$10\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.040\\text{ m}$$, $$40\\%$$ dan $$12\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$0.17\\text{ m}$$, $$60\\%$$ dan $$12\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
