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
          label: "Ammonium nitrate, $$6.00\\text{ kg}$$, $$13.2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "Urea, $$12.0\\text{ kg}$$, $$13.2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "Urea, $$6.00\\text{ kg}$$, $$26.4\\text{ kg}$$",
        },
        {
          correct: true,
          label: "Urea, $$6.00\\text{ kg}$$, $$13.2\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ammonium nitrat, $$6.00\\text{ kg}$$, $$13.2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "Urea, $$12.0\\text{ kg}$$, $$13.2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "Urea, $$6.00\\text{ kg}$$, $$26.4\\text{ kg}$$",
        },
        {
          correct: true,
          label: "Urea, $$6.00\\text{ kg}$$, $$13.2\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
