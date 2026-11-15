import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "bus-punctuality",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Northline ran a larger share of its urban trips on time than Southway did.",
        },
        {
          column: 2,
          label: "Southway was the more punctual operator on rural routes.",
        },
        {
          column: 1,
          label:
            "The newspaper's figure of seven points is calculated correctly from the table.",
        },
        {
          column: 2,
          label:
            "Northline's lower overall rate shows that it runs late more often on every kind of route.",
        },
        {
          column: 1,
          label:
            "The gap between the two overall rates comes from the different mix of routes rather than from Southway being more punctual.",
        },
      ],
    },
  },
};

export default item;
