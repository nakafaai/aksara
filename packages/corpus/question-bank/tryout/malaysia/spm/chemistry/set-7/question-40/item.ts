import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$350\\text{ cm}^3$$, $$427\\text{ g}$$, $$64.8\\%$$",
        },
        {
          correct: true,
          label: "$$368\\text{ cm}^3$$, $$427\\text{ g}$$, $$64.8\\%$$",
        },
        {
          correct: false,
          label: "$$368\\text{ cm}^3$$, $$500\\text{ g}$$, $$70.0\\%$$",
        },
        {
          correct: false,
          label: "$$368\\text{ cm}^3$$, $$409\\text{ g}$$, $$67.7\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$350\\text{ cm}^3$$, $$427\\text{ g}$$, $$64.8\\%$$",
        },
        {
          correct: true,
          label: "$$368\\text{ cm}^3$$, $$427\\text{ g}$$, $$64.8\\%$$",
        },
        {
          correct: false,
          label: "$$368\\text{ cm}^3$$, $$500\\text{ g}$$, $$70.0\\%$$",
        },
        {
          correct: false,
          label: "$$368\\text{ cm}^3$$, $$409\\text{ g}$$, $$67.7\\%$$",
        },
      ],
    },
  },
};

export default item;
