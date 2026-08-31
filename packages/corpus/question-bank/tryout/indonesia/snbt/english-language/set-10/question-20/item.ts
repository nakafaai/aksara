import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A recurring object that remains part of the setting",
        },
        {
          isCorrect: true,
          label:
            "A pencil-worn ledger in an empty hall after a planning meeting",
        },
        {
          isCorrect: false,
          label: "A conflict settled before the character's final choice",
        },
        {
          isCorrect: false,
          label: "open ending as a term without a role in the story",
        },
        {
          isCorrect: false,
          label: "An ending that removes the object's interpretive tension",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
