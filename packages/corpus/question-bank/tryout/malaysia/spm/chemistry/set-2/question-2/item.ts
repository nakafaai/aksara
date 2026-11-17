import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$12.0\\%$$, $$1.08\\times10^{22}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$9.0\\%$$, $$1.44\\times10^{22}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$12.0\\%$$, $$1.10\\times10^{22}$$, $$95.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$12.0\\%$$, $$1.08\\times10^{22}$$, $$300\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$12.0\\%$$, $$1.08\\times10^{22}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$9.0\\%$$, $$1.44\\times10^{22}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$12.0\\%$$, $$1.10\\times10^{22}$$, $$95.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$12.0\\%$$, $$1.08\\times10^{22}$$, $$300\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
