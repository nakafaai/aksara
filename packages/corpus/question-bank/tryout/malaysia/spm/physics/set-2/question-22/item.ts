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
          label: "$$4.10\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$4.02\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$1.97\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$5.04\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.10\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$4.02\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$1.97\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$5.04\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
