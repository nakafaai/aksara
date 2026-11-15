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
            'The twelfth crossing, justified because the timetable "had never said anything about a last day", shows him using his own rules to put off the ending.',
        },
        {
          column: 2,
          label:
            "By the end, the father has decided that the ferry was never important.",
        },
        {
          column: 2,
          label:
            "The final scene shows that the father has fully accepted the bridge.",
        },
      ],
    },
  },
};

export default item;
