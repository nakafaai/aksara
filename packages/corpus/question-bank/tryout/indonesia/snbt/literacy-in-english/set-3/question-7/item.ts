import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "bag-charge",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Supermarkets in the city hand out far fewer carrier bags than before the charge.",
        },
        {
          column: 2,
          label:
            "The city uses about $$320$$ tonnes less plastic each year because of the charge.",
        },
        {
          column: 2,
          label:
            "Results of the charge should be reported by weight, with bin liners included.",
        },
        {
          column: 1,
          label:
            "The charge has reduced the amount of plastic used in the city.",
        },
        {
          column: 2,
          label:
            "Paper bags are worse for the environment than plastic carrier bags.",
        },
      ],
    },
  },
};

export default item;
