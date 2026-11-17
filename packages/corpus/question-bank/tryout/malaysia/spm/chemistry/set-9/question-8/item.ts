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
          correct: false,
          label: "Rubidium, $$5.00\\text{ cm}^3$$, $$0.435\\text{ g}$$",
        },
        {
          correct: false,
          label: "Potassium, $$20.0\\text{ cm}^3$$, $$0.870\\text{ g}$$",
        },
        {
          correct: true,
          label: "Potassium, $$10.0\\text{ cm}^3$$, $$0.870\\text{ g}$$",
        },
        {
          correct: false,
          label: "Potassium, $$10.0\\text{ cm}^3$$, $$0.0870\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rubidium, $$5.00\\text{ cm}^3$$, $$0.435\\text{ g}$$",
        },
        {
          correct: false,
          label: "Kalium, $$20.0\\text{ cm}^3$$, $$0.870\\text{ g}$$",
        },
        {
          correct: true,
          label: "Kalium, $$10.0\\text{ cm}^3$$, $$0.870\\text{ g}$$",
        },
        {
          correct: false,
          label: "Kalium, $$10.0\\text{ cm}^3$$, $$0.0870\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
