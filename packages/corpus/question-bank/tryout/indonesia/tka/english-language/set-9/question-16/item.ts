import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "paper-lantern",
  versions: {
    en: {
      columns: [
        "Cutting the paper",
        "Folding and marking",
        "Shaping and finishing",
      ],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Drawing a line 2 centimeters below the open edges",
        },
        {
          column: 1,
          label: "Cutting straight up to the line every 2 centimeters",
        },
        {
          column: 3,
          label: "Pressing the top and bottom of the tube toward each other",
        },
        { column: 3, label: "Gluing a paper strip across the top as a handle" },
      ],
    },
  },
};

export default item;
