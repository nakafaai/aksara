import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$680\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$660\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$700\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$1400\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$680\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$660\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$700\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$1400\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
