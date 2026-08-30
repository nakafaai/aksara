import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The fair opened fifteen minutes early.",
        },
        {
          isCorrect: false,
          label: "Every display was moved outdoors.",
        },
        {
          isCorrect: true,
          label: "The class arranged access to the stored ramp.",
        },
        {
          isCorrect: false,
          label: "The caretaker locked all other doors.",
        },
        {
          isCorrect: false,
          label: "The class removed the route symbols.",
        },
      ],
    },
  },
  stimulusKey: "accessible-fair",
};

export default item;
