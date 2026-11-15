import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$400\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$4.0\\times10^{4}\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$200\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$400\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$4.0\\times10^{4}\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$200\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
