import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "path-concrete",
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
          label:
            "Adding a little water to a mix that has begun to stiffen after two hours, so that it can still be poured",
        },
        {
          column: 1,
          label:
            "Walking on the path on the fourth day while the sacks are still kept damp",
        },
        {
          column: 2,
          label:
            "Taking the damp sacks off on the fifth day because the path already looks hard",
        },
        {
          column: 3,
          label: "Colouring the concrete red by adding a powder to the dry mix",
        },
        {
          column: 1,
          label:
            "Pouring the mix $$60$$ minutes after adding the water, before it has started to set",
        },
      ],
    },
  },
};

export default item;
