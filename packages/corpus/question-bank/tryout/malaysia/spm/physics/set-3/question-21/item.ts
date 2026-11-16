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
          label: "$$0.31\\text{ m s}^{-2}$$; $$1268\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.67\\text{ m s}^{-2}$$; $$1000\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.31\\text{ m s}^{-2}$$; $$1000\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$0.31\\text{ m s}^{-2}$$; $$1615\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.31\\text{ m s}^{-2}$$; $$1268\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.67\\text{ m s}^{-2}$$; $$1000\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$0.31\\text{ m s}^{-2}$$; $$1000\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$0.31\\text{ m s}^{-2}$$; $$1615\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
