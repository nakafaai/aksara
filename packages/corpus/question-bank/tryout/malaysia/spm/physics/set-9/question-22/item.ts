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
            "It stops after $$0.15\\text{ m}$$, with a greatest force of $$120\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$2.2\\text{ m s}^{-1}$$, and $$80\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ m s}^{-1}$$, and $$80\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$2.2\\text{ m s}^{-1}$$, and $$120\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia berhenti selepas $$0.15\\text{ m}$$, dengan daya terbesar $$120\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$2.2\\text{ m s}^{-1}$$, dan $$80\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ m s}^{-1}$$, dan $$80\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$2.2\\text{ m s}^{-1}$$, dan $$120\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
