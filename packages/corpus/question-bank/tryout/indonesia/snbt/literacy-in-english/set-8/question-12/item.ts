import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "hotel-survey",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "A higher share of Harbour's answers rated the stay good or excellent than of Station's answers.",
        },
        {
          column: 2,
          label: "Most of the chain's guests answered the survey.",
        },
        {
          column: 1,
          label:
            "At least about $$13\\%$$ of all the chain's guests rated their stay good or excellent.",
        },
        {
          column: 2,
          label:
            "Guests at Harbour were happier with their stay than guests at Station.",
        },
        {
          column: 2,
          label:
            "If unhappy guests answer less often, the $$92\\%$$ is more likely to understate satisfaction than to overstate it.",
        },
      ],
    },
  },
};

export default item;
