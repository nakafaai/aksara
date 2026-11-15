import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "market-scale",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "The man in the good coat received less rice than the needle showed.",
        },
        {
          column: 1,
          label:
            "The inspector's clean record says more about when he visits than about how the scale is used.",
        },
        {
          column: 1,
          label:
            "Before weighing the man's rice, Grandma moves the needle from just below zero to exactly zero.",
        },
        {
          column: 2,
          label:
            "The narrator works out the purpose of the screw the moment Grandma shows it to her.",
        },
        {
          column: 2,
          label:
            "Grandma accepts the narrator's mistakes because a small loss to a customer does not matter to her.",
        },
      ],
    },
  },
};

export default item;
