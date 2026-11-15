import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.060\\text{ mol}$$",
        },
        {
          correct: true,
          label: "$$0.040\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$0.020\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$0.080\\text{ mol}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.060\\text{ mol}$$",
        },
        {
          correct: true,
          label: "$$0.040\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$0.020\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$0.080\\text{ mol}$$",
        },
      ],
    },
  },
};

export default item;
