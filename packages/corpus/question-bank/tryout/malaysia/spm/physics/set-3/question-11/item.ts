import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$465\\text{ kPa}$$, and then $$220\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$242\\text{ kPa}$$, and then $$200\\text{ kPa}$$",
        },
        {
          correct: true,
          label: "$$252\\text{ kPa}$$, and then $$191\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$352\\text{ kPa}$$, and then $$291\\text{ kPa}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$465\\text{ kPa}$$, dan kemudian $$220\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$242\\text{ kPa}$$, dan kemudian $$200\\text{ kPa}$$",
        },
        {
          correct: true,
          label: "$$252\\text{ kPa}$$, dan kemudian $$191\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$352\\text{ kPa}$$, dan kemudian $$291\\text{ kPa}$$",
        },
      ],
    },
  },
};

export default item;
