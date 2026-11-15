import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "night-bus",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Mr Lin's shift at the hospital had ended before the last bus left the town centre.",
        },
        {
          column: 2,
          label:
            "After the narrator went in, Mr Lin walked on past her house towards his own street.",
        },
        {
          column: 1,
          label:
            "The narrator's fear on the lane came from not knowing who the man was.",
        },
        {
          column: 2,
          label: "Mr Lin followed the narrator all the way to her front door.",
        },
        {
          column: 2,
          label:
            "The narrator's mother had told her in advance that Mr Lin would be on the bus.",
        },
      ],
    },
  },
};

export default item;
