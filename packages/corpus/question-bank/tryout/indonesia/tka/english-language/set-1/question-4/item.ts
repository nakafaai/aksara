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
            "A seedling planted at night reaches a girl's knee by the next morning.",
        },
        {
          column: 1,
          label:
            "A tamarind seedling reaches a girl's knee a year or two after it is planted.",
        },
        {
          column: 1,
          label:
            "A heron standing on a drowned minaret gives a loud cry as a boat drifts closer.",
        },
        {
          column: 2,
          label:
            "A pencil line moves by itself overnight to curve around the place where a tree once stood.",
        },
      ],
    },
  },
};

export default item;
