import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$196\\text{ kW}$$",
        },
        {
          correct: false,
          label: "$$174\\text{ kW}$$",
        },
        {
          correct: true,
          label: "$$177\\text{ kW}$$",
        },
        {
          correct: false,
          label: "$$180\\text{ kW}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$196\\text{ kW}$$",
        },
        {
          correct: false,
          label: "$$174\\text{ kW}$$",
        },
        {
          correct: true,
          label: "$$177\\text{ kW}$$",
        },
        {
          correct: false,
          label: "$$180\\text{ kW}$$",
        },
      ],
    },
  },
};

export default item;
