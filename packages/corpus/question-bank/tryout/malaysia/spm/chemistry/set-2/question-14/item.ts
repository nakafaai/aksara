import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.47\\text{ g}$$, $$80.0\\text{ cm}^3$$, $$85.0\\%$$",
        },
        {
          correct: false,
          label: "$$2.96\\text{ g}$$, $$0\\text{ cm}^3$$, $$70.8\\%$$",
        },
        {
          correct: false,
          label: "$$2.47\\text{ g}$$, $$40.0\\text{ cm}^3$$, $$85.0\\%$$",
        },
        {
          correct: false,
          label: "$$2.47\\text{ g}$$, $$800\\text{ cm}^3$$, $$85.0\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.47\\text{ g}$$, $$80.0\\text{ cm}^3$$, $$85.0\\%$$",
        },
        {
          correct: false,
          label: "$$2.96\\text{ g}$$, $$0\\text{ cm}^3$$, $$70.8\\%$$",
        },
        {
          correct: false,
          label: "$$2.47\\text{ g}$$, $$40.0\\text{ cm}^3$$, $$85.0\\%$$",
        },
        {
          correct: false,
          label: "$$2.47\\text{ g}$$, $$800\\text{ cm}^3$$, $$85.0\\%$$",
        },
      ],
    },
  },
};

export default item;
