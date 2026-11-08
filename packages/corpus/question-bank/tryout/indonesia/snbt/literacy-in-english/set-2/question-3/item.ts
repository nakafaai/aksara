import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "tardigrade-survival",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "An active tardigrade can easily survive conditions that kill most other small invertebrates.",
        },
        {
          column: 1,
          label:
            "In the tun state, a tardigrade's metabolism drops to a level that is barely detectable.",
        },
        {
          column: 1,
          label:
            "The passage suggests that some proteins found in tardigrades lack a fixed shape in solution.",
        },
        {
          column: 2,
          label:
            "The passage reports that vaccines can already be stored dry at room temperature using tardigrade proteins.",
        },
      ],
    },
  },
};

export default item;
