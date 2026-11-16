import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "M is sodium, and 10.2 g of its oxide holds 7.6 g of M",
        },
        {
          correct: false,
          label: "M is aluminium, and 10.2 g of its oxide holds 2.7 g of M",
        },
        {
          correct: true,
          label: "M is aluminium, and 10.2 g of its oxide holds 5.4 g of M",
        },
        {
          correct: false,
          label: "M is magnesium, and 10.2 g of its oxide holds 6.1 g of M",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "M ialah natrium, dan 10.2 g oksidanya mengandungi 7.6 g M",
        },
        {
          correct: false,
          label: "M ialah aluminium, dan 10.2 g oksidanya mengandungi 2.7 g M",
        },
        {
          correct: true,
          label: "M ialah aluminium, dan 10.2 g oksidanya mengandungi 5.4 g M",
        },
        {
          correct: false,
          label: "M ialah magnesium, dan 10.2 g oksidanya mengandungi 6.1 g M",
        },
      ],
    },
  },
};

export default item;
