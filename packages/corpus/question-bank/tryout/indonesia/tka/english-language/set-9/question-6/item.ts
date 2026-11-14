import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "class-mural",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        { column: 2, label: "The theme “Our River” won by a large margin." },
        { column: 1, label: "Preparing the wall took two Saturdays." },
        { column: 2, label: "The class used the design of only one group." },
        { column: 1, label: "The outline was sketched in chalk." },
      ],
    },
  },
};

export default item;
