import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "dog-pointing",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The 2021 results count against explaining the dog pups' success by a general advantage in memory or self-control.",
        },
        {
          column: 2,
          label:
            "The Bray study shows that roughly $$60\\%$$ of a puppy's skill at following a point comes from what it has learned.",
        },
        {
          column: 1,
          label:
            "The dog pups' advantage in 2021 cannot be put down to their having had more human contact than the wolf pups.",
        },
        {
          column: 1,
          label:
            "The 2008 wolf results and the 2021 wolf results can both be accurate even if a wolf's experience with people shapes how well it follows a point.",
        },
      ],
    },
  },
};

export default item;
