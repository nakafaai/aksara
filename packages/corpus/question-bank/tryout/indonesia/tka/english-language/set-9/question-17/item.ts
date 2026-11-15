import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "bread-rolls",
  versions: {
    en: {
      columns: [
        "Follows the instructions",
        "Breaks the instructions",
        "Not covered",
      ],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Adding water that has been heated to $$50$$ degrees",
        },
        {
          column: 2,
          label:
            "Using $$1{,}000$$ g of flour and $$14$$ g of yeast for a double batch",
        },
        {
          column: 1,
          label:
            "Letting the shaped rolls rise for $$30$$ minutes after a first rise of $$60$$ minutes",
        },
        {
          column: 3,
          label: "Adding raisins to the dough",
        },
        {
          column: 2,
          label:
            "Pouring the salt straight onto the yeast before the flour goes in",
        },
        {
          column: 1,
          label:
            "Weighing the pieces so that all $$12$$ come out the same weight",
        },
      ],
    },
  },
};

export default item;
