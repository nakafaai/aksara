import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "congestion-charge",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Fewer cars enter the centre than before the charge.",
        },
        {
          column: 2,
          label:
            "Private cars entering the centre are down by about $$18\\%$$.",
        },
        {
          column: 1,
          label: "The city should keep the charge.",
        },
        {
          column: 2,
          label:
            "Average speeds in the centre are almost back to where they were before the charge.",
        },
        {
          column: 2,
          label: "Ride-hailing cars should pay the charge.",
        },
      ],
    },
  },
};

export default item;
