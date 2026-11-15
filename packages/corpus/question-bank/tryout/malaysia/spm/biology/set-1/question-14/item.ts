import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "immunity-in-humans",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Day $$76$$, natural passive immunity",
        },
        {
          correct: false,
          label: "Day $$90$$, natural passive immunity",
        },
        {
          correct: false,
          label: "Day $$76$$, natural active immunity",
        },
        {
          correct: false,
          label: "Day $$104$$, natural passive immunity",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Hari ke-$$76$$, keimunan pasif semula jadi",
        },
        {
          correct: false,
          label: "Hari ke-$$90$$, keimunan pasif semula jadi",
        },
        {
          correct: false,
          label: "Hari ke-$$76$$, keimunan aktif semula jadi",
        },
        {
          correct: false,
          label: "Hari ke-$$104$$, keimunan pasif semula jadi",
        },
      ],
    },
  },
};

export default item;
