import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "tardigrade-survival",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tardigrades thrive in extreme environments such as outer space because their active bodies are exceptionally strong.",
        },
        {
          correct: true,
          label:
            "Tardigrades survive extremes mainly by drying into an inactive state, aided by proteins still being studied.",
        },
        {
          correct: false,
          label:
            "Tardigrades and brine shrimp use the same sugar to protect their cells from drying out.",
        },
        {
          correct: false,
          label:
            "Tardigrade proteins are already being used to store vaccines without refrigeration.",
        },
        {
          correct: false,
          label:
            "Tardigrades are the only animals that can survive for years without any water at all.",
        },
      ],
    },
  },
};

export default item;
