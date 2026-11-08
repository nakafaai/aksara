import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "slime-mould",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "The slime mould is a kind of fungus.",
        },
        {
          column: 1,
          label:
            "In the maze experiment, food was placed at the entrance and at the exit.",
        },
        {
          column: 2,
          label: "Tubes that carry more nutrients gradually become thinner.",
        },
        {
          column: 1,
          label:
            "The slime mould's network around Tokyo kept working well when one link was cut.",
        },
      ],
    },
  },
};

export default item;
