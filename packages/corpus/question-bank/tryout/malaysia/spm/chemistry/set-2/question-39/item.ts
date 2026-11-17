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
          label: "$$15.8\\text{ g}$$, $$21.2\\%$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$13.2\\text{ g}$$, $$10.6\\%$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$13.2\\text{ g}$$, $$21.2\\%$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$13.2\\text{ g}$$, $$21.2\\%$$, $$20.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$15.8\\text{ g}$$, $$21.2\\%$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$13.2\\text{ g}$$, $$10.6\\%$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$13.2\\text{ g}$$, $$21.2\\%$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$13.2\\text{ g}$$, $$21.2\\%$$, $$20.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
