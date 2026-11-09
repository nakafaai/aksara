import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  stimulus: "water-filter",
  versions: {
    en: {
      columns: ["Supported", "Not supported"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Water from this filter is safe to drink once it looks clear.",
        },
        {
          column: 1,
          label:
            "Pouring too fast lets some water pass through without being filtered.",
        },
        { column: 1, label: "Gravel forms the top layer of the filter." },
        {
          column: 2,
          label: "This filter can remove dissolved chemicals from the water.",
        },
      ],
    },
  },
};

export default item;
