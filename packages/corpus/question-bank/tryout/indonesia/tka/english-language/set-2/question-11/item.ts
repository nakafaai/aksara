import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  stimulus: "sprout",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$48\\%$$, so the club should buy new seed",
        },
        {
          correct: false,
          label: "$$54\\%$$, so the club should buy new seed",
        },
        {
          correct: true,
          label: "$$54\\%$$, so the club should sow two seeds in every hole",
        },
        {
          correct: false,
          label: "$$27\\%$$, so the club should buy new seed",
        },
        {
          correct: false,
          label: "$$84\\%$$, so the club should sow as usual",
        },
      ],
    },
  },
};

export default item;
