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
          label: "$$35.0\\text{ mL}$$, $$7.15\\times10^{-3}\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$45.0\\text{ mL}$$, $$8.74\\times10^{-3}\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$22.5\\text{ mL}$$, $$3.58\\times10^{-3}\\text{ mol}$$",
        },
        {
          correct: true,
          label: "$$22.5\\text{ mL}$$, $$5.17\\times10^{-3}\\text{ mol}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$35.0\\text{ mL}$$, $$7.15\\times10^{-3}\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$45.0\\text{ mL}$$, $$8.74\\times10^{-3}\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$22.5\\text{ mL}$$, $$3.58\\times10^{-3}\\text{ mol}$$",
        },
        {
          correct: true,
          label: "$$22.5\\text{ mL}$$, $$5.17\\times10^{-3}\\text{ mol}$$",
        },
      ],
    },
  },
};

export default item;
