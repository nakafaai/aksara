import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "hill-observatory",
  versions: {
    en: {
      columns: ["Ground floor", "Lawn outside", "Upper floor"],
      kind: "matrix",
      statements: [
        { column: 1, label: "A screen for showing photographs" },
        { column: 3, label: "The main telescope on a concrete pillar" },
        { column: 2, label: "Smaller telescopes set up for visitors" },
        { column: 1, label: "Twenty folding chairs" },
      ],
    },
  },
};

export default item;
