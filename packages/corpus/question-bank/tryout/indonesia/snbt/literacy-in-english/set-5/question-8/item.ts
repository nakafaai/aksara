import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "nuclear-power",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A city's first tram line runs late and over budget, and its planners argue that the city should stop after one line, since a second would cost just as much.",
        },
        {
          correct: false,
          label:
            "A city's first tram line runs late and over budget because no local firm has built one in decades, and its planners argue that the city should hire a foreign firm for every later line.",
        },
        {
          correct: true,
          label:
            "A city's first tram line runs late and over budget because no local firm has built one in decades, and its planners argue that later lines will come cheaper only if the city keeps building them.",
        },
        {
          correct: false,
          label:
            "A city's first tram line runs late and over budget, and its planners argue that later lines will come cheaper because the price of tram cars is falling worldwide.",
        },
        {
          correct: false,
          label:
            "A city's first three tram lines all opened on time, and its planners argue that a fourth will cost the same as each of the first three.",
        },
      ],
    },
  },
};

export default item;
