import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "octopus-arms",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "To position a hand, the human brain needs to coordinate fewer angles than would be needed for an octopus arm.",
        },
        {
          column: 2,
          label:
            "The author claims that octopus brains are too small to plan any arm movements.",
        },
        {
          column: 1,
          label: "An octopus can detect chemicals through its suckers.",
        },
        {
          column: 2,
          label:
            "The passage states that severed octopus arms can solve mazes.",
        },
      ],
    },
  },
};

export default item;
