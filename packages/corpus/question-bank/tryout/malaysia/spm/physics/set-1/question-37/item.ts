import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.0\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$4.3\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$9.0\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.0\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$4.3\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$9.0\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
