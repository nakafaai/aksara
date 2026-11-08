import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "ibn-battuta",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "To give a concrete example of the welcome his learning brought him",
        },
        {
          correct: false,
          label:
            "To prove that Ibn Battuta's account of China is entirely reliable",
        },
        {
          correct: false,
          label:
            "To show that Samudra Pasai was the largest port in the Indian Ocean",
        },
        {
          correct: false,
          label:
            "To explain why Ibn Battuta lost most of his notes on the voyage",
        },
        {
          correct: false,
          label:
            "To argue that the sultan of Pasai later wrote the *Rihla* himself",
        },
      ],
    },
  },
};

export default item;
