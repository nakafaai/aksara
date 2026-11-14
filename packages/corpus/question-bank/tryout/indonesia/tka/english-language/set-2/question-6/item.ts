import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "meadow",
  versions: {
    en: {
      columns: ["Fact", "Opinion"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "In Lindung, a two-year trial in one park found three times as many bee visits on the planted strips as on the lawn beside them.",
        },
        {
          column: 1,
          label:
            "Fast-growing weeds take over before the native plants are established.",
        },
        {
          column: 2,
          label:
            "Even a $$10\\%$$ cut in mowing would be the smartest decision the council has made in years.",
        },
        {
          column: 1,
          label: "Mowing alone burns about $$3{,}000$$ litres of fuel a year.",
        },
      ],
    },
  },
};

export default item;
