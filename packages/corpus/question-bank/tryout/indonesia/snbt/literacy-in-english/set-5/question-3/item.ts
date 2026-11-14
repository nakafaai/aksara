import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "supporting-detail",
  },
  stimulus: "continental-drift",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Wegener's estimate of Greenland's speed was one of the reasons physicists judged his proposed forces too feeble to move a continent.",
        },
        {
          column: 1,
          label:
            "The land bridges that critics proposed were meant to explain the shared fossils, yet they left the ancient ice in India unexplained.",
        },
        {
          column: 2,
          label:
            "Most speakers at the 1926 symposium in New York accepted Wegener's fossil and rock evidence and objected only to his mechanism.",
        },
        {
          column: 2,
          label:
            "The seafloor evidence gathered from the 1950s onwards showed that Harold Jeffreys's objection to Wegener had been mistaken.",
        },
      ],
    },
  },
};

export default item;
