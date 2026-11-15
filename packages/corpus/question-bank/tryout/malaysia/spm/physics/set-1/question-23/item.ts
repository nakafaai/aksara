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
          label: "$$20\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$15\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$15\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
