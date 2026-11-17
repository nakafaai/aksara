import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$81.7\\%$$, $$17.5\\text{ cm}^3$$, $$2.05\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$81.7\\%$$, $$15.0\\text{ cm}^3$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$81.7\\%$$, $$35.0\\text{ cm}^3$$, $$2.05\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$40.8\\%$$, $$17.5\\text{ cm}^3$$, $$2.05\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$81.7\\%$$, $$17.5\\text{ cm}^3$$, $$2.05\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$81.7\\%$$, $$15.0\\text{ cm}^3$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$81.7\\%$$, $$35.0\\text{ cm}^3$$, $$2.05\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$40.8\\%$$, $$17.5\\text{ cm}^3$$, $$2.05\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
