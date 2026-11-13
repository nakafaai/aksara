import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "reservoir",
  versions: {
    en: {
      columns: ["Could happen in real life", "Could not happen in real life"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "A pencil line that Laras had ruled straight curves around an empty space the next morning, although nobody erased or redrew it.",
        },
        {
          column: 1,
          label:
            "A heron standing on the minaret calls out as the boat drifts closer.",
        },
        {
          column: 1,
          label:
            "Grandmother can name the family of a drowned house only when she floats above the spot where it stood.",
        },
        {
          column: 2,
          label:
            "Within one night, a seed that had been carried for decades grows a shoot as tall as a girl's knee.",
        },
      ],
    },
  },
};

export default item;
