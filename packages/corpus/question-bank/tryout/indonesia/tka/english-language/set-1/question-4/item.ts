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
            "A pencil line on Laras's map shifts overnight to curve around an empty space, although nobody erased it.",
        },
        {
          column: 2,
          label:
            "A heron standing on the minaret calls Grandmother by the name only her mother had used.",
        },
        {
          column: 1,
          label:
            "Grandmother can recall who lived in a house only when she is on the water above the spot where it stood.",
        },
        {
          column: 2,
          label:
            "A tamarind seed planted at night has a shoot as tall as a girl's knee by the next morning.",
        },
      ],
    },
  },
};

export default item;
