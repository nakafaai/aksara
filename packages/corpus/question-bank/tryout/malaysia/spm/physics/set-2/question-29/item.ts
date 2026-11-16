import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.4\\text{ minutes}$$",
        },
        {
          correct: false,
          label: "$$4.8\\text{ minutes}$$",
        },
        {
          correct: true,
          label: "$$5.2\\text{ minutes}$$",
        },
        {
          correct: false,
          label: "$$4.2\\text{ minutes}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.4\\text{ minit}$$",
        },
        {
          correct: false,
          label: "$$4.8\\text{ minit}$$",
        },
        {
          correct: true,
          label: "$$5.2\\text{ minit}$$",
        },
        {
          correct: false,
          label: "$$4.2\\text{ minit}$$",
        },
      ],
    },
  },
};

export default item;
