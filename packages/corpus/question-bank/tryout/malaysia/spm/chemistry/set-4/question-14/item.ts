import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "7.2 g of crystals" },
        { correct: false, label: "14.8 g of crystals" },
        {
          correct: true,
          label:
            "11.8 g of crystals, after the unreacted magnesium oxide is filtered off",
        },
        {
          correct: false,
          label:
            "5.8 g of crystals, after the unreacted magnesium oxide is filtered off",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "7.2 g hablur" },
        { correct: false, label: "14.8 g hablur" },
        {
          correct: true,
          label:
            "11.8 g hablur, selepas magnesium oksida yang tidak bertindak balas dituras",
        },
        {
          correct: false,
          label:
            "5.8 g hablur, selepas magnesium oksida yang tidak bertindak balas dituras",
        },
      ],
    },
  },
};

export default item;
