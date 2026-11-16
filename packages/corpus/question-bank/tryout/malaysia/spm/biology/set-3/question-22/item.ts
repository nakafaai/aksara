import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "plant-tissue-organisation-and-growth",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Absolute rate in week 8, relative rate in week 8",
        },
        {
          correct: true,
          label: "Absolute rate in week 5, relative rate in week 2",
        },
        {
          correct: false,
          label: "Absolute rate in week 5, relative rate in week 5",
        },
        {
          correct: false,
          label: "Absolute rate in week 4, relative rate in week 1",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kadar mutlak dalam minggu ke-8, kadar relatif dalam minggu ke-8",
        },
        {
          correct: true,
          label:
            "Kadar mutlak dalam minggu ke-5, kadar relatif dalam minggu ke-2",
        },
        {
          correct: false,
          label:
            "Kadar mutlak dalam minggu ke-5, kadar relatif dalam minggu ke-5",
        },
        {
          correct: false,
          label:
            "Kadar mutlak dalam minggu ke-4, kadar relatif dalam minggu ke-1",
        },
      ],
    },
  },
};

export default item;
