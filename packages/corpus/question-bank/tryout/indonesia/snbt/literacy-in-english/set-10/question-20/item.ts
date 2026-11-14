import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "river-ferry",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The story leaves the father's feelings about the bridge for the reader to infer.",
        },
        {
          column: 2,
          label:
            "The narrator presents the bridge as a mistake that the town will come to regret.",
        },
        {
          column: 1,
          label:
            "The ending suggests that an old habit carries on in a new setting.",
        },
        {
          column: 2,
          label:
            "By the end, the father has decided that the ferry was never important.",
        },
      ],
    },
  },
};

export default item;
