import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "rosetta-stone",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The Rosetta Stone should be returned to Egypt from the British Museum in London.",
        },
        {
          correct: false,
          label:
            "Thomas Young deserves more credit than Champollion for the decipherment of hieroglyphs.",
        },
        {
          correct: false,
          label:
            "Greek was the most important language in ancient Egypt in 196 BC.",
        },
        {
          correct: false,
          label:
            "Coptic was invented by Champollion to help him read the hieroglyphs on the stone.",
        },
        {
          correct: true,
          label:
            "Reading hieroglyphs required abandoning the idea that they were purely mystical.",
        },
      ],
    },
  },
};

export default item;
