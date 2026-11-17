import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.63\\text{ g}$$, $$32.5\\%$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$1.63\\text{ g}$$, $$67.5\\%$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$3.25\\text{ g}$$, $$35.0\\%$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.63\\text{ g}$$, $$67.5\\%$$, $$75.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.63\\text{ g}$$, $$32.5\\%$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$1.63\\text{ g}$$, $$67.5\\%$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$3.25\\text{ g}$$, $$35.0\\%$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.63\\text{ g}$$, $$67.5\\%$$, $$75.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
