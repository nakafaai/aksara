import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "symbol",
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
            "The narrator had never before seen her father read back through the ledger.",
        },
        {
          column: 1,
          label:
            "The closed ledger on the windowsill links the story's last scene to the father's years of keeping records.",
        },
        {
          column: 2,
          label:
            "The father kept the ledger because the ferry company required him to.",
        },
        {
          column: 2,
          label:
            'The final entry, "river quiet", shows that the river was unusually calm for the time of year.',
        },
      ],
    },
  },
};

export default item;
