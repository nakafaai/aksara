import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
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
            "The father's nods to the council man are polite rather than a sign that he agrees.",
        },
        {
          column: 2,
          label:
            "The father believes that the bridge will bring no jobs to the town.",
        },
        {
          column: 1,
          label:
            "The father's remark about the high river suggests that the man does not know what the ferry's work involved.",
        },
        {
          column: 2,
          label:
            "The narrator signals that she shares the council man's view of the bridge.",
        },
        {
          column: 2,
          label:
            "The council man chooses his words especially for this ferryman and this occasion.",
        },
      ],
    },
  },
};

export default item;
