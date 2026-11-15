import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "mozart-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Listen to a favourite song just before the puzzle.",
        },
        {
          correct: false,
          label:
            "Listen to a favourite song an hour before the puzzle, so there is time to settle.",
        },
        {
          correct: true,
          label:
            "If you enjoy stories more than music, listen to an interesting story just before the puzzle.",
        },
        {
          correct: false,
          label:
            "Listen to slow, sad music just before the puzzle, to calm your nerves.",
        },
        {
          correct: false,
          label:
            "Listen to Mozart rather than any other composer, because the composer is what matters.",
        },
      ],
    },
  },
};

export default item;
