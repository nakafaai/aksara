import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kettle and toaster; $$\\text{RM}\\,96$$",
        },
        {
          correct: false,
          label: "Heater and toaster; $$\\text{RM}\\,150$$",
        },
        {
          correct: false,
          label: "Kettle and heater; $$\\text{RM}\\,111$$",
        },
        {
          correct: true,
          label: "Heater and toaster; $$\\text{RM}\\,75$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Cerek dan pembakar roti; $$\\text{RM}\\,96$$",
        },
        {
          correct: false,
          label: "Pemanas dan pembakar roti; $$\\text{RM}\\,150$$",
        },
        {
          correct: false,
          label: "Cerek dan pemanas; $$\\text{RM}\\,111$$",
        },
        {
          correct: true,
          label: "Pemanas dan pembakar roti; $$\\text{RM}\\,75$$",
        },
      ],
    },
  },
};

export default item;
