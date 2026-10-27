import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "rooftop-garden",
  versions: {
    en: {
      columns: ["Plant support", "Water care", "Record keeping"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Bamboo frames tied to heavy planters",
        },
        {
          column: 2,
          label: "Mesh covers on the containers",
        },
        {
          column: 3,
          label: "A notebook in a sealed box",
        },
      ],
    },
  },
};

export default item;
