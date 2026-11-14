import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "pottery-village",
  versions: {
    en: {
      columns: ["Drying yard", "Kiln", "Workshop"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Pots are fired for about eight hours." },
        { column: 3, label: "A potter turns the wheel with a foot." },
        {
          column: 1,
          label: "Pots stand in rows on bamboo racks in the shade.",
        },
        { column: 3, label: "Younger potters finish the edges by hand." },
      ],
    },
  },
};

export default item;
