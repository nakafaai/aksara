import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "visitor-fee",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The fee will make the city famous as a model of good tourism policy.",
        },
        {
          correct: false,
          label:
            "The fee will be printed on symbols and signs throughout the city.",
        },
        {
          correct: false,
          label:
            "The fee proves that the city has finally solved its overtourism problem.",
        },
        {
          correct: false,
          label:
            "The fee may push residents to leave the city for quieter places.",
        },
        {
          correct: true,
          label:
            "The fee may look like action while leaving the crowds as large as before.",
        },
      ],
    },
  },
};

export default item;
