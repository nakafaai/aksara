import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "book-cover",
  versions: {
    en: {
      columns: ["Folding and taping", "Cutting", "Measuring and marking"],
      kind: "matrix",
      statements: [
        {
          column: 3,
          label: "Marking a line on the plastic 5 centimeters outside the book",
        },
        {
          column: 2,
          label: "Cutting a narrow V shape at the top and bottom of the spine",
        },
        {
          column: 1,
          label: "Folding the side flaps over the inside of the covers",
        },
        { column: 1, label: "Taping each corner of the flaps to the plastic" },
      ],
    },
  },
};

export default item;
