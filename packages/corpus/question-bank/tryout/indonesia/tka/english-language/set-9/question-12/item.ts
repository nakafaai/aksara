import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "outline",
  },
  stimulus: "substitute-teacher",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pak Hendra walks into Class 9B instead of Bu Lina.",
        },
        {
          correct: false,
          label:
            "The class whispers about what substitute teachers usually do.",
        },
        { correct: false, label: "Pak Hendra asks who has ever been lost." },
        { correct: false, label: "Fikri says he once took the wrong angkot." },
        {
          correct: true,
          label:
            "The class leaves Bu Lina a note asking to keep Pak Hendra's maps.",
        },
      ],
    },
  },
};

export default item;
