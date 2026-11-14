import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "point-of-view",
  },
  stimulus: "night-orchard",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The narrator's understanding of her grandfather's habits changes as she grows older.",
        },
        {
          column: 2,
          label:
            "The grandfather explains his method to the narrator in full before they begin.",
        },
        {
          column: 1,
          label:
            "The grandfather's nod after her clumsy explanation shows encouragement rather than judgement.",
        },
        {
          column: 2,
          label:
            "The story is told by the grandfather looking back on his life.",
        },
      ],
    },
  },
};

export default item;
