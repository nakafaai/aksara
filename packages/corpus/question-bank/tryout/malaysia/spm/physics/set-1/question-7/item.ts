import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$18\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$19\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$5.0\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$18\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$19\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$5.0\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
