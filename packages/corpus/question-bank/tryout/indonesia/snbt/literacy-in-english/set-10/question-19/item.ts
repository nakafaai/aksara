import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The definition explains why the missing final budget is a deliberate part of the story, allowing the changed decision process to matter before the outcome is known.",
        },
        {
          isCorrect: false,
          label:
            "The term confirms that the team will approve the larger concert, even though the story withholds its decision.",
        },
        {
          isCorrect: false,
          label:
            "The definition identifies the pencil-worn ledger itself as an open ending rather than describing the unresolved conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The term allows any prediction about the final budget to be correct, even if it ignores the unresolved quotes.",
        },
        {
          isCorrect: false,
          label:
            "The definition explains why the hall is empty and therefore makes Iris's changes to the ledger irrelevant.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
