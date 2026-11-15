import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "information-validity",
  },
  stimulus: "mangrove-planting",
  versions: {
    en: {
      columns: ["Supported", "Contradicted", "Not stated"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "More seedlings died or went missing in Zone C than in Zones A and B together.",
        },
        {
          column: 1,
          label: "Zone A had the highest survival rate by Bu Fitri's method.",
        },
        {
          column: 3,
          label:
            "Most of the $$50$$ seedlings replanted in May were alive in June.",
        },
        {
          column: 1,
          label:
            "Fewer than two-thirds of the seedlings planted in March were counted as surviving.",
        },
        {
          column: 3,
          label: "The uncertain seedlings in Zone B later died.",
        },
      ],
    },
  },
};

export default item;
