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
          label: "Ammonium nitrate, $$1.75\\text{ kg}$$, $$2.25\\text{ kg}$$",
        },
        {
          correct: false,
          label: "Urea, $$0.875\\text{ kg}$$, $$4.13\\text{ kg}$$",
        },
        {
          correct: false,
          label: "Urea, $$1.75\\text{ kg}$$, $$4.50\\text{ kg}$$",
        },
        {
          correct: true,
          label: "Urea, $$1.75\\text{ kg}$$, $$2.25\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ammonium nitrat, $$1.75\\text{ kg}$$, $$2.25\\text{ kg}$$",
        },
        {
          correct: false,
          label: "Urea, $$0.875\\text{ kg}$$, $$4.13\\text{ kg}$$",
        },
        {
          correct: false,
          label: "Urea, $$1.75\\text{ kg}$$, $$4.50\\text{ kg}$$",
        },
        {
          correct: true,
          label: "Urea, $$1.75\\text{ kg}$$, $$2.25\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
