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
          label: "Ethanol is limiting, and the percentage yield is $$40\\%$$",
        },
        {
          correct: true,
          label:
            "Ethanoic acid is limiting, and the percentage yield is $$60\\%$$",
        },
        {
          correct: false,
          label:
            "Ethanoic acid is limiting, and the percentage yield is $$88\\%$$",
        },
        {
          correct: false,
          label: "Ethanol is limiting, and the percentage yield is $$77\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Etanol ialah bahan pengehad, dan peratus hasil ialah $$40\\%$$",
        },
        {
          correct: true,
          label:
            "Asid etanoik ialah bahan pengehad, dan peratus hasil ialah $$60\\%$$",
        },
        {
          correct: false,
          label:
            "Asid etanoik ialah bahan pengehad, dan peratus hasil ialah $$88\\%$$",
        },
        {
          correct: false,
          label:
            "Etanol ialah bahan pengehad, dan peratus hasil ialah $$77\\%$$",
        },
      ],
    },
  },
};

export default item;
