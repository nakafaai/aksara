import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "bike-tire",
  versions: {
    en: {
      columns: ["Finding the hole", "Removing the tube", "Repairing the tube"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Holding the tube under water to look for bubbles",
        },
        { column: 3, label: "Rubbing the area around the hole with sandpaper" },
        { column: 2, label: "Sliding the second lever around the rim" },
        { column: 3, label: "Pressing the patch firmly onto the glue" },
      ],
    },
  },
};

export default item;
