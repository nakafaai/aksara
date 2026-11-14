import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "train-station",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The clock broke during a storm in 1985." },
        {
          correct: false,
          label: "It is the time when the museum opens each day.",
        },
        { correct: false, label: "It was the year the locomotive was built." },
        {
          correct: false,
          label: "The volunteer set it to mark his first day at work.",
        },
        {
          correct: true,
          label: "It was the departure time of the last passenger train.",
        },
      ],
    },
  },
};

export default item;
