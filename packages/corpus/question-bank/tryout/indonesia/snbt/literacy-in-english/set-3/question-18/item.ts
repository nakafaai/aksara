import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "clinic-interpreter",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "The father asked for help because he struggles to understand the doctor's language.",
        },
        {
          column: 1,
          label:
            "The doctor addressed her explanations mainly to the narrator rather than to the father.",
        },
        {
          column: 1,
          label:
            "What troubles the father most at the clinic is being judged, not the medical terms.",
        },
        {
          column: 2,
          label:
            "The narrator realises on the bus that her father has not been taking his tablets.",
        },
        {
          column: 1,
          label:
            "The father said \"Every day\" in the doctor's language rather than in the family's own.",
        },
      ],
    },
  },
};

export default item;
