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
          correct: true,
          label: "$$108\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$102\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$126\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$108\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$102\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$126\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
