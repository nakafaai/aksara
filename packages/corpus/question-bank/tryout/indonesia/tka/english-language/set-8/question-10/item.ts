import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "fact-opinion",
  },
  stimulus: "science-fair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I think that was the best compliment we could have received.",
        },
        { correct: false, label: "We repeated the test three times." },
        {
          correct: false,
          label: "The unwrapped cube melted in about 40 minutes.",
        },
        { correct: false, label: "The judges gave us second place." },
        {
          correct: false,
          label:
            "Each group of three had four weeks to plan and carry out a small experiment.",
        },
      ],
    },
  },
};

export default item;
