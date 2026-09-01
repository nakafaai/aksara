import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "outline",
  },
  responses: {
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Listening to an owner's description before touching the bicycle",
        },
        {
          isCorrect: false,
          label: "Replacing the child's chain without testing it",
        },
        {
          isCorrect: true,
          label: "Sorting mixed bolts by using notes and measurements",
        },
        {
          isCorrect: false,
          label:
            "Giving a new volunteer the repair answer before asking what the rider noticed",
        },
      ],
    },
  },
  stimulusKey: "repair-workshop",
};

export default item;
