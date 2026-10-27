import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "comparison",
  },
  stimulus: "accessible-fair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The writer learned that signs are adequate when their designer can explain them nearby.",
        },
        {
          correct: false,
          label:
            "The writer treated the rainy-day delays as proof that the project had failed.",
        },
        {
          correct: false,
          label: "The writer stopped recording remaining problems.",
        },
        {
          correct: true,
          label:
            "The writer learned that a route must be tested by people with different needs.",
        },
        {
          correct: false,
          label:
            "The writer believed symbols were less useful than hidden arrows.",
        },
      ],
    },
  },
};

export default item;
