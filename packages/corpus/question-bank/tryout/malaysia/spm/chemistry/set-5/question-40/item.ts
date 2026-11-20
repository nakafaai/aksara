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
          correct: true,
          label: "$$0.965\\text{ g}$$, $$12.3\\%$$, $$96.5\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.965\\text{ g}$$, $$12.3\\%$$, $$9.65\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$9.65\\times10^{-7}\\text{ g}$$, $$12.3\\%$$, $$9.65\\times10^{-5}\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.965\\text{ g}$$, $$2.04\\%$$, $$96.5\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.965\\text{ g}$$, $$12.3\\%$$, $$96.5\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.965\\text{ g}$$, $$12.3\\%$$, $$9.65\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$9.65\\times10^{-7}\\text{ g}$$, $$12.3\\%$$, $$9.65\\times10^{-5}\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.965\\text{ g}$$, $$2.04\\%$$, $$96.5\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
