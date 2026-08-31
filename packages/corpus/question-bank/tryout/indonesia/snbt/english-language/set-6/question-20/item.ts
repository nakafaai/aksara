import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "A spool of gold thread in a repair café during a storm",
        },
        {
          isCorrect: false,
          label: "A recurring object that remains part of the setting",
        },
        {
          isCorrect: false,
          label: "A conflict settled before the character's final choice",
        },
        {
          isCorrect: false,
          label: "sensory imagery as a term without a role in the story",
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
