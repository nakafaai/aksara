import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "mozart-effect",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "The 1993 study found that the effect of the sonata lasted for several weeks.",
        },
        {
          column: 1,
          label:
            "A student who heard a lively piece by another composer would be expected to do about as well as one who heard the Mozart.",
        },
        {
          column: 2,
          label:
            "The later review found that the effect does not exist at all.",
        },
        {
          column: 1,
          label:
            "If two students heard the same Mozart piece but only one came away more alert and cheerful, the mood explanation predicts a smaller gain for the other.",
        },
        {
          column: 2,
          label: "The 1993 researchers recommended playing Mozart to babies.",
        },
      ],
    },
  },
};

export default item;
