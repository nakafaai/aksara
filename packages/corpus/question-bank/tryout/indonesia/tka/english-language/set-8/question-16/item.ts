import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "fried-rice",
  versions: {
    en: {
      columns: ["Preparing", "Cooking", "Serving"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Breaking up lumps in the cold rice" },
        { column: 2, label: "Frying the garlic and shallots until golden" },
        { column: 3, label: "Sprinkling fried shallots on top" },
        { column: 2, label: "Stirring in the sweet soy sauce" },
      ],
    },
  },
};

export default item;
