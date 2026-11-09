import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "slime-mould",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To argue that railway engineers should stop studying slime moulds",
        },
        {
          correct: false,
          label:
            "To admit that the Tokyo experiment was carried out incorrectly",
        },
        {
          correct: false,
          label:
            "To suggest that slime moulds design networks better than people",
        },
        {
          correct: true,
          label: "To correct the idea that the slime mould plans its networks",
        },
        {
          correct: false,
          label:
            "To claim that the slime mould's network was probably a coincidence",
        },
      ],
    },
  },
};

export default item;
