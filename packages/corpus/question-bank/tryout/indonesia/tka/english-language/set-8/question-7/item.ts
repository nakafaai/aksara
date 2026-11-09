import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "science-fair",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        { column: 2, label: "The group won first place." },
        { column: 1, label: "Each group had four weeks to prepare." },
        { column: 1, label: "The group repeated its test three times." },
        { column: 2, label: "The cube wrapped in foil lasted the longest." },
      ],
    },
  },
};

export default item;
