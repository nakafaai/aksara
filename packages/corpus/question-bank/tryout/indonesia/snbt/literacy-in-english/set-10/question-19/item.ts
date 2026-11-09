import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The definition explains why the missing final budget is a deliberate part of the story, allowing the changed decision process to matter before the outcome is known.",
        },
        {
          correct: false,
          label:
            "The term confirms that the team will approve the larger concert, even though the story withholds its decision.",
        },
        {
          correct: false,
          label:
            "The definition identifies the pencil-worn ledger itself as an open ending rather than describing the unresolved conclusion.",
        },
        {
          correct: false,
          label:
            "The term allows any prediction about the final budget to be correct, even if it ignores the unresolved quotes.",
        },
        {
          correct: false,
          label:
            "The definition explains why the hall is empty and therefore makes Iris's changes to the ledger irrelevant.",
        },
      ],
    },
  },
};

export default item;
