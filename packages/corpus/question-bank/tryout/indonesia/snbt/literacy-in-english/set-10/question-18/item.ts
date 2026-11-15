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
          column: 2,
          label:
            "The narrator had often seen her father read back through the ledger.",
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
          column: 1,
          label:
            'The final entry, "river quiet", is the kind of note he made for every crossing, not a comment written only for the last one.',
        },
        {
          column: 1,
          label:
            "Counting the first cars on the bridge carries on, in a way, the habit that the ledger records.",
        },
      ],
    },
  },
};

export default item;
