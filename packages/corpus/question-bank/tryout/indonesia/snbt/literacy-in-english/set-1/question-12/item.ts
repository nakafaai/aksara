import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "UNESCO works only to protect famous cultural monuments.",
        },
        {
          correct: false,
          label:
            "UNESCO mainly writes domestic laws that every government must adopt.",
        },
        {
          correct: false,
          label:
            "UNESCO was created to manage the Sustainable Development Goals after 2015.",
        },
        {
          correct: false,
          label:
            "UNESCO replaces national education and science institutions with one global system.",
        },
        {
          correct: true,
          label:
            "UNESCO builds peace through international cooperation, shared standards, knowledge, and programs across its fields of expertise.",
        },
      ],
    },
  },
};

export default item;
