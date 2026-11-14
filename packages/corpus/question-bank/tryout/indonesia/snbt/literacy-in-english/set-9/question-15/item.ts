import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "solar-heat",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The months with panel temperatures above $$25$$ °C were also the four months in which the most sunlight arrived.",
        },
        {
          column: 2,
          label:
            "Because summer output is high, a fall in efficiency in summer costs less electricity than the same fall would in spring.",
        },
        {
          column: 1,
          label:
            "In July, one percentage point of efficiency was worth more electricity than in March.",
        },
        {
          column: 2,
          label:
            "With the frames in place, July's output would reach what the panels produce at March efficiency.",
        },
      ],
    },
  },
};

export default item;
