import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.400\\text{ g}$$, $$0.920\\text{ g}$$, $$200\\%$$",
        },
        {
          correct: false,
          label: "$$1.20\\text{ g}$$, $$2.76\\text{ g}$$, $$66.7\\%$$",
        },
        {
          correct: false,
          label: "$$1.20\\text{ g}$$, $$0.920\\text{ g}$$, $$68.8\\%$$",
        },
        {
          correct: true,
          label: "$$1.20\\text{ g}$$, $$0.920\\text{ g}$$, $$66.7\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.400\\text{ g}$$, $$0.920\\text{ g}$$, $$200\\%$$",
        },
        {
          correct: false,
          label: "$$1.20\\text{ g}$$, $$2.76\\text{ g}$$, $$66.7\\%$$",
        },
        {
          correct: false,
          label: "$$1.20\\text{ g}$$, $$0.920\\text{ g}$$, $$68.8\\%$$",
        },
        {
          correct: true,
          label: "$$1.20\\text{ g}$$, $$0.920\\text{ g}$$, $$66.7\\%$$",
        },
      ],
    },
  },
};

export default item;
