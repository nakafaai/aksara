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
          label: "Propyl methanoate, $$7.92\\text{ g}$$, $$60\\%$$",
        },
        {
          correct: true,
          label: "Methyl propanoate, $$7.92\\text{ g}$$, $$60\\%$$",
        },
        {
          correct: false,
          label: "Methyl propanoate, $$9.90\\text{ g}$$, $$75\\%$$",
        },
        {
          correct: false,
          label: "Methyl propanoate, $$7.92\\text{ g}$$, $$75\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Propil metanoat, $$7.92\\text{ g}$$, $$60\\%$$",
        },
        {
          correct: true,
          label: "Metil propanoat, $$7.92\\text{ g}$$, $$60\\%$$",
        },
        {
          correct: false,
          label: "Metil propanoat, $$9.90\\text{ g}$$, $$75\\%$$",
        },
        {
          correct: false,
          label: "Metil propanoat, $$7.92\\text{ g}$$, $$75\\%$$",
        },
      ],
    },
  },
};

export default item;
