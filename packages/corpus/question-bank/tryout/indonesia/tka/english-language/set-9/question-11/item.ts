import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "substitute-teacher",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "He finds ways to get students involved." },
        {
          correct: true,
          label:
            "He builds on what students already know from their own lives.",
        },
        {
          correct: false,
          label: "He spends most of the lesson looking at his phone.",
        },
        { correct: true, label: "He connects the activity to the textbook." },
      ],
    },
  },
};

export default item;
