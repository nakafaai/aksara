import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "visitor-fee",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Booking time slots can spread visits across the day.",
        },
        {
          column: 1,
          label:
            "Fee revenue should be reported openly and spent where residents can see the results.",
        },
        {
          column: 2,
          label:
            "Cities that depend on tourism should close their gates to visitors.",
        },
        {
          column: 2,
          label:
            "Venice charges the fee to day visitors on every day of the year.",
        },
      ],
    },
  },
};

export default item;
