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
          label: "Signs were lowered.",
        },
        {
          isCorrect: false,
          label:
            "Every display was moved out of the experiment room after the test walk.",
        },
        {
          isCorrect: true,
          label: "Pale text was replaced with darker lettering.",
        },
        {
          isCorrect: false,
          label: "The portable ramp was permanently removed.",
        },
      ],
    },
  },
  stimulusKey: "accessible-fair",
};

export default item;
